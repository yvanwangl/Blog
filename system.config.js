/**
 * Created by wyf on 2017/3/24.
 */
const debug = process.env.NODE_ENV == 'development';

//开发环境跨域请求
const httpServerDev = 'http://localhost:3000';
const optionConfigDev = {
    mode: 'cors',
    credentials: 'include',
    headers: {
        'content-type': 'application/json'
    },
};

//部署环境同域请求
const httpServerProd = '';
const optionConfigProd = {
	mode: 'same-origin',
    headers: {
        'content-type': 'application/json'
    },
};

const mongooseConnectDev = "mongodb://localhost:27017/blog";
const mongooseConnectProd = "mongodb://lihuan:lihuan0215@localhost:29019/blog";

//前台文件打包后输出的文件夹，后台访问的静态资源文件夹
const publicDir = 'dist';

module.exports = {
	mongooseConnect: debug? mongooseConnectDev:mongooseConnectProd,
	publicDir,
	httpServer: debug ? httpServerDev:httpServerProd,
    defaultOptions: debug ? optionConfigDev:optionConfigProd
};