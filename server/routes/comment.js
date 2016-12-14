/**
 * Created by wyf on 2016/11/17.
 */
"use strict";
var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');

router.route('/')
        .post(function(req, res){
            /**
             * 新增一条评论
             */
            var commentData = req.body;
            var comment = new Comment({
                parentId:commentData['parentId'],
                blogId:commentData['blogId'],
                name: commentData['name'],
                commentTime: new Date(),
                commentContent: commentData['commentContent'],
                agree: 0,
                disagree: 0
            });
            comment.save(function (err, comment) {
                if(err){
                    res.send(err);
                }else {
                    res.send({
                        is_success:true,
                        comment:comment
                    });
                }
            });
        });

router.route('/:comment_id')
        .post(function (req, res) {
            /**
             * 修改评论的赞同和不赞同数量
             */
            var commentData = req.body;
            Comment.findById(req.params.comment_id,function(err, comment){
                if(err){
                    res.send(err);
                }else {
                    comment['agree'] = commentData['agree'];
                    comment['disagree'] = commentData['disagree'];
                    comment.save(function(err, comment){
                        if(err){
                            res.send(err);
                        }else {
                            res.send({
                                is_success:true,
                                likeResult:{
                                    commentId:comment['_id'],
                                    agree:comment['agree'],
                                    disagree:comment['disagree']
                                }
                            });
                        }
                    });
                }
            });
        })
        .delete(function(req, res){
            /**
             * 删除评论
             */
            var parentId = req.body.commentId;
            var authCookie = req.body.authCookie;
            var authToken = global[Symbol.for('authCookie')];
            var commentIds = [];
            console.log(authCookie);
            console.log(authToken);
            if(authCookie&&authToken&&authCookie==authToken){
                /**
                 * 删除子评论
                 */
                Comment.findByParentId(parentId, function (err, comments) {
                    if(err){
                        res.send(err);
                    }
                    comments.forEach(function (comment) {
                        commentIds.push(comment['_id']);
                        comment.remove();
                    });
                    /**
                     * 删除当前评论
                     */
                    Comment.remove({
                        _id:parentId
                    }, function(err, comment){
                        if(err){
                            res.send(err);
                        }else {
                            commentIds.push(parentId);
                            res.send({
                                is_success:true,
                                commentIds:commentIds
                            });
                        }
                    })
                });
            }else {
                res.send({
                    is_success:false,
                    reason:'Access Denied!!'
                });
            }
        });

module.exports = router;