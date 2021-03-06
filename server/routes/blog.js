"use strict";
var path = require('path');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Blog = require('../models/blogs');
var Comment = require('../models/comments');

/*router.get('/(:id)',function(req, res, next){
    res.sendfile(path.resolve(__dirname,'../../client','index.html'));
});*/

function sendBlog(res, err, blog) {
    if(err){
        res.send(err);
    }else {
        res.send({
            is_success:true,
            blog:blog
        });
    }
}

function sendBlogs(res, err, blogs, type, page, totalBlogs) {
    if(err){
        res.send(err);
    }else {
        res.send({
            is_success:true,
            blogs:blogs,
            type:type,
            page:page,
            totalBlogs:totalBlogs
        });
    }
}

router.route('/')
    .get(function(req, res, next){          //根据状态和分页查询blog列表数据
        var authToken = global[Symbol.for('authCookie')];
        var reqData = req.query;
        console.log(reqData);
        var is_login = reqData.is_login;
        var authCookie = reqData.authCookie;
        var page = reqData.page;
        var type = reqData.type;
        var limit = 10;
        var skip = (page-1)*10;
        var queryCondition ={
            blogStatus:is_login=='true'?{$in:['draft','publish']}:'publish',
            type:type=='all'?{$in:['design','develop']}:type
        };
        //如果为登录状态则需验证token
        if(is_login=='true'){
            if(!(authCookie&&authToken&&authCookie==authToken)){
                res.send({
                    is_success:false,
                    reason:'Access Denied!!'
                });
            }
        }
        Blog.count(queryCondition,function(err, count){
            Blog.find(queryCondition)
                .sort('-publishDate')
                .limit(limit)
                .skip(skip)
                .exec(function (err, blogs) {
                    sendBlogs(res, err, blogs, type, page, count);
                });
        });
    })
    .post(function (req, res, next) {           //新增一篇博客
        var blogData = req.body;
        var authCookie = blogData['authCookie'];
        var authToken = global[Symbol.for('authCookie')];
        /*console.log(`authCookie:${authCookie}`);
        console.log(`authToken:${authToken}`);*/
        if(authCookie&&authToken&&authCookie==authToken){
            Blog.find(function(err, blogList){
                var id;
                if(blogList.length==0){
                    id = 1;
                }else {
                    id = blogList[blogList.length-1]['id']+1;
                }
                var blog = new Blog({
                    id:id,
                    title:blogData['title'],
                    author:blogData['author'],
                    content:JSON.stringify(blogData['rowData']),
                    plaintext:blogData['plaintext'],
                    publishDate:new Date(),
                    blogStatus:blogData['blogStatus'],
                    type:blogData['type'],
                    count:1
                });
                blog.save(function(err, blog){
                    sendBlog(res, err, blog);
                });
            });
        }else {
            res.send({
                is_success:false,
                reason:'Access Denied!!'
            });
        }
    });

router.route('/:blog_id')
    .get(function(req, res, next){              //根据id查询博客
        var blogId = req.params.blog_id;
        var count = req.query.count;
        if(count>0){                              //浏览时加载博客数据
            Blog.findOneAndUpdate({_id:blogId}, {count:count},{upsert: true, 'new': true} ,function(err, blog){
                console.log(count);
                console.log(blog);
                Comment.findByBlogId(blogId, function(err, comments){
                    if(err){
                        res.send(err);
                    }
                    res.send({
                        is_success:true,
                        blog:blog,
                        comments:comments
                    });
                });
            });
        }else {
            Blog.findById(blogId, function(err, blog){
                Comment.findByBlogId(blogId, function(err, comments){
                    if(err){
                        res.send(err);
                    }
                    res.send({
                        is_success:true,
                        blog:blog,
                        comments:comments
                    });
                });
            });
        }

    })
    .put(function(req, res, next){              //修改博客
        var blogId = req.params.blog_id;
        var blogData = req.body;
        var authCookie = blogData['authCookie'];
        var authToken = global[Symbol.for('authCookie')];
        console.log(`authCookie:${authCookie}`);
        console.log(`authToken:${authToken}`);
        if(authCookie&&authToken&&authCookie==authToken){
            var saveData = {
                title: blogData['title'],
                author: blogData['author'],
                content: JSON.stringify(blogData['rowData']),
                plaintext: blogData['plaintext'],
                blogStatus: blogData['blogStatus'],
                type: blogData['type'],
            };
            if(blogData['updateDate']=="true"){
                saveData["publishDate"] = new Date();
            }
            Blog.findOneAndUpdate({_id:blogId}, saveData,{new:true}, function(err, blog){
                sendBlog(res, err, blog);
            });
        }else {
            res.send({
                is_success:false,
                reason:'Access Denied!!'
            });
        }
    });
    /*.delete(function(req, res, next){           //删除博客
        var blogId = req.params.blog_id;
        res.send({
            is_success:false,
            reason:'Access Denied!!'
        });
/!*        Blog.remove({_id:blogId}, function(err, blog){
            sendBlog(res, err, blog);
        });*!/
    });*/

module.exports = router;
