/**
 * Created by wyf on 2017/3/24.
 */
const httpServer = '';

//const mongooseConnect = "mongodb://localhost:27017/blog";
const mongooseConnect = "mongodb://lihuan:lihuan0215@localhost:29019/blog";

//前台文件打包后输出的文件夹，后台访问的静态资源文件夹
const publicDir = 'dist';

module.exports = {
	mongooseConnect,
	publicDir
};