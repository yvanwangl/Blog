/**
 * Created by wyf on 2016/11/23.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

//139.224.195.74
var server = 'localhost';
var port = 3000;
// 文件将要上传到哪个文件夹下面
var uploadfoldername = 'uploadfiles';
var uploadfolderpath = path.join(__dirname, '../',uploadfoldername);

router.route('/')
    .post(function (req, res, next) {
        // 使用第三方的 formidable 插件初始化一个 form 对象
        var form = new formidable.IncomingForm();
        form.uploadDir='../tmp';

        form.parse(req, function (err, fields, files) {
            if(err){
                return console.log('formidable, form.parse err');
            }

            console.log('formidable, form.parse ok');
            // 显示参数，例如 token
            console.log('显示上传时的参数 begin');
            console.log(fields);
            console.log('显示上传时的参数 end');

            var item;
            // 计算 files 长度
            var length = 0;
            for (item in files) {
                length++;
            }
            if (length === 0) {
                return console.log('files no data');
            }

            for (item in files) {
                var file = files[item];
                // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
                var tempfilepath = file.path;
                // 获取文件类型
                var type = file.type;

                // 获取文件名，并根据文件名获取扩展名
                var filename = file.name;
                var extname = filename.lastIndexOf('.') >= 0
                    ? filename.slice(filename.lastIndexOf('.') - filename.length)
                    : '';
                // 文件名没有扩展名时候，则从文件类型中取扩展名
                if (extname === '' && type.indexOf('/') >= 0) {
                    extname = '.' + type.split('/')[1];
                }
                // 将文件名重新赋值为一个随机数（避免文件重名）
                filename = Math.random().toString().slice(2) + extname;

                // 构建将要存储的文件的路径
                var filenewpath = path.join(uploadfolderpath, filename);

                // 将临时文件保存为正式的文件
                fs.rename(tempfilepath, filenewpath, function (err) {
                    // 存储结果
                    var result = '';
                    console.log(tempfilepath);
                    console.log(filenewpath);

                    if (err) {
                        // 发生错误
                        console.log(err);
                        console.log('fs.rename err');
                        result = 'error|save error';
                    } else {
                        // 保存成功
                        console.log('fs.rename done');
                        // 拼接图片url地址
                        result = 'http://' + server + ':' + port + '/server/' + uploadfoldername + '/' + filename;
                    }

                    // 返回结果
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    res.end(result);
                }); // fs.rename
            } // for in
        });
    });

module.exports = router;