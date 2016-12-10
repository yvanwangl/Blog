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
function saveBlog(blog, res){
    blog.save(function(err){
        if(err){
            console.log(err);
        }else {
            res.send({
                save_success:true,
                blog:blog
            });
        }
    });
}

router.post('/save',function(req, res, next){
    var blogData = req.body;
    //blogData['title']='这是第一篇博客';
    /**
     * 判断是新增还是修改
     */
    console.log(typeof blogData['id']);
    Blog.findById(blogData['id'],function(err, blog){
        //修改
        if(blog){
            console.log(blogData['plaintext']);
            console.log(blogData['rowData']);
            var modifyData = {
                title:blogData['title'],
                content:JSON.stringify(blogData['rowData']),
                plaintext:blogData['plaintext'],
                publishDate:new Date(),
                blogStatus:blogData['blogStatus'],
                type:blogData['type']
            };
            console.log(blog);
            //var blog = Object.assign({}, blogList[0], modifyData);
            blog['title'] = blogData['title'];
            blog['author'] = blogData['author'];
            blog['content'] = JSON.stringify(blogData['rowData']);
            blog['plaintext'] = blogData['plaintext'];
            blog['publishDate'] = new Date();
            blog['blogStatus'] = blogData['blogStatus'];
            blog['type'] = blogData['type'];
            console.log(blog);
            saveBlog(blog, res);
        }else {
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
                saveBlog(blog, res);
            });
        }
    });
});

function sendBlogs(err, blogs) {
    if(err){
        res.send(err);
    }else {
        res.send({
            is_success:true,
            blogs:blogs
        });
    }
}

router.route('/')
    .get(function(req, res, next){          //根据状态和分页查询blog列表数据
        var queryData = res.query;
        var is_login = queryData.is_login;
        var page = queryData.page;
        var limit = page*10;
        if(is_login == 'true'){
            Blog.find(function (err, blogs) {
                sendBlogs(err, blogs);
            })
        }else {
            Blog.findByStatys('publish', function(err, blogs){
                sendBlogs(err, blogs);
            });
        }
    })
    .post(function (req, res, next) {           //新增一篇博客
        Blog.find(function(err, blogList){
            var blogData = req.body;
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
            saveBlog(blog, res);
        });
    });


function sendBlog(err, blog) {
    if(err){
        res.send(err);
    }else {
        res.send({
            is_success:true,
            blog:blog
        });
    }
}
router.route('/:blog_id')
    .get(function(req, res, next){              //根据id查询博客
        var blogId = req.params.blog_id;
        Blog.findById(blogId, function(err, blog){
            sendBlog(err, blog);
        });
    })
    .put(function(req, res, next){              //修改博客
        var blogId = req.params.blog_id;
        var blogData = req.body;
        Blog.findAndModify(blogId, blogData, function(err, blog){
            sendBlog(err, blog);
        });
    })
    .delete(function(req, res, next){           //删除博客
        var blogId = req.params.blog_id;
        Blog.remove({_id:blogId}, function(err, blog){
            sendBlog(err, blog);
        });
    });

router.post('/',function(req, res, next){
    var blogId = req.body.blogId;
    console.log(blogId);
    Blog.findById(blogId,function(err, blog){
        console.log(blog);
        if(err){
            console.log(err);
        }else {
            res.send({
                is_success:true,
                blog:blog
            });
        }
    });
});

router.post('/saveCount', function(req, res, next){
    var blogCount = req.body;
    Blog.findById(blogCount['blogId'],function(err, blog){
        console.log(blog);
        if(err){
            console.log(err);
        }else {
            blog['count'] = blogCount['count'];
            blog.save(function(err){
                if(err){
                    console.log(err);
                }else {
                    Comment.find({blogId:blog['_id']}, function (err, comments) {
                        if(err){
                            res.send(err);
                        }else {
                            res.send({
                                save_success:true,
                                blog:blog,
                                comments:comments
                            });
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;