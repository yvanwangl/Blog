var rucksack = require('rucksack-css');
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var entry = {};
var plugins = [];
var devTools = '';
if (process.env.NODE_ENV == 'production') {
    entry = {
        jsx: ['./index.js'],
        html: ['./index.html'],
        /*vendor: [
         'react',
         'react-dom',
         'react-redux',
         'react-router',
         'react-router-redux',
         'redux',
         'react-router',
         'draft-js'
         ]*/
    };
    plugins = [
        new webpack.optimize.UglifyJsPlugin(),
        //new webpack.optimize.DedupePlugin(),
        /*new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),*/
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')}
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin (),
		new ExtractTextPlugin('style.css')
    ];
    devTools = '';
} else {
    //var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
    entry = {
        jsx: ['./index.js', ],
        html: ['./index.html', ],
        /*vendor: [
         'react',
         'react-dom',
         'react-redux',
         'react-router',
         'react-router-redux',
         'redux',
         'react-router',
         'draft-js',
         hotMiddlewareScript
         ]*/
    };
    plugins = [
        /*new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),*/
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')}
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('style.css')
    ];
    devTools = '#source-map';
}
/* baseConfig */
var baseConfig = {
    context: path.join(__dirname, './client'),
    entry: entry,
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash:5].chunk.js',
		publicPath:'/'
    },
    devServer: {
        inline: true,
        hot: true,
        open: true,
        contentBase: '/dict',
        historyApiFallback: {
            index: '/index.html'
        }
    },
    devtool: devTools,
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
					use: 'css-loader'
				})
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf|ico)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
            },
            /*{
             test: /\.(png|jpg)$/,
             loader: 'url-loader'
             //loader: 'url-loader?limit=8192'
             }, // inline base64 URLs for <=8k images, direct URLs for the rest*/
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader'
                ]
            },
            {test: /\.svg$/, loader: 'babel-loader?presets[]=es2015,presets[]=react!svg-react-loader'}
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    /*postcss: [
        rucksack({
            autoprefixer: true
        })
    ],*/
    plugins: plugins,
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'redux-thunk': 'ReduxThunk',
        'react-redux': 'ReactRedux',
        'react-addons-css-transition-group': 'React.addons.CSSTransitionGroup',
        'react-router': 'ReactRouter',
        'draft-js': 'Draft',
        'wangeditor': 'wangEditor',
        'jQuery': 'jQuery'
    },
};
/* end baseConfig */

module.exports = baseConfig;
