var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');
//var hotMiddlewareScript = process.env.NODE_ENV=='development'?'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true':'';
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

var entry = {};
var plugins = [];
if(process.env.NODE_ENV=='production') {
    console.log(process.env.NODE_ENV+'webpack');
    entry={
        jsx: ['./index.js'],
            html: ['./index.html'],
            vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'antd',
            'draft-js'
        ]
    };
    plugins=[
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')}
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    ];
}else {
    entry={
        jsx: ['./index.js', hotMiddlewareScript],
        html: ['./index.html', hotMiddlewareScript],
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-redux',
            'redux',
            'antd',
            'draft-js',
            hotMiddlewareScript
        ]
    };
    plugins=[
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')}
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ];
}
/* baseConfig */
var baseConfig = {
    context: path.join(__dirname, './client'),
    entry: entry,
    output: {
        path: path.join(__dirname, './staticResource'),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash:5].chunk.js',
        publicPath: '/__build__/'
    },
    //devtool: '#source-map',
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
                //loader: 'url-loader?limit=8192'
            }, // inline base64 URLs for <=8k images, direct URLs for the rest
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            },
        ],
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    postcss: [
        rucksack({
            autoprefixer: true
        })
    ],
    plugins: plugins
};
/* end baseConfig */

module.exports = baseConfig;
