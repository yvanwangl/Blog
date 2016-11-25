var http = require('http');
var httpProxy = require('http-proxy');
var https = require('https');
var fs = require('fs');
var path = require('path');
var options = {
    ca: fs.readFileSync(path.join(__dirname, '/www_yvanwang_com/www_yvanwang_com.ca-bundle')),
    key: fs.readFileSync(path.join(__dirname, '/www_yvanwang_com/www_yvanwang_com.key')),
    cert: fs.readFileSync(path.join(__dirname, '/www_yvanwang_com/www_yvanwang_com.crt')),
};

// 新建一个代理 Proxy Server 对象
var proxy = httpProxy.createProxyServer({});

// 捕获异常 
proxy.on('error', function (err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error message.');
});

// 另外新建一个 HTTP 80 端口的服务器，也就是常规 Node 创建 HTTP 服务器的方法。  
// 在每次请求中，调用 proxy.web(req, res config) 方法进行请求分发  
var httpsServer = https.createServer(options, function (req, res) {
    // 在这里可以自定义你的路由分发
    var host = req.headers.host, ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("client ip:" + ip + ", host:" + host);
    switch (host) {
        case 'yvanwang.com':
            proxy.web(req, res, {target: 'http://localhost:3000'});
            break;
        case 'www.yvanwang.com':
            proxy.web(req, res, {target: 'http://localhost:3000'});
            break;
        case 'blog.yvanwang.com':
            proxy.web(req, res, {target: 'http://localhost:3000'});
            break;
        case 'sunnyhuan.yvanwang.com':
            proxy.web(req, res, {target: 'http://localhost:3000'});
            break;
        default:
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Welcome to my yvanwang's blog!");
    }
});

var httpServer = http.createServer(function (req, res) {
    // 在这里可以自定义你的路由分发

});

httpProxy.createServer(function (req, res, proxy) {
    // Inspect request and decide whether to proxy, then...
    var host = req.headers.host, ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("client ip:" + ip + ", host:" + host);
    switch (host) {
        case 'yvanwang.com':
            proxy.proxyRequest(req, res, {
                host: 'https://yvanwang.com',
                port: 443,
                target: {
                    https: true,
                    url:'https://yvanwang.com'
                }
            });
            break;
        case 'www.yvanwang.com':
            proxy.web(req, res, {target: 'https://www.yvanwang.com'});
            break;
        case 'blog.yvanwang.com':
            proxy.web(req, res, {target: 'https://blog.yvanwang.com'});
            break;
        case 'sunnyhuan.yvanwang.com':
            proxy.web(req, res, {target: 'https://sunnyhuan.yvanwang.com'});
            break;
        default:
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end("Welcome to my yvanwang's blog!");
    }
}).listen(80);


console.log("httpsServer listening on port 443");
httpsServer.listen(443);

/*console.log("httpServer listening on port 80");
httpServer.listen(80);*/
