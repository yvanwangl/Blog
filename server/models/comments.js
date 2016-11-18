/**
 * Created by wyf on 2016/11/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    parentId:String,
    blogId:String,
    name: String,
    commentTime: Date,
    commentContent:String,
    agree: Number,
    disagree: Number
});

/**
 *here can add same methods or statics
 */
commentSchema.statics.findByParentId = function (parentId, callback) {
    return this.find({parentId:parentId}, callback);
};

module.exports = mongoose.model('Comment', commentSchema);