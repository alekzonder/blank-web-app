var webpack = require('webpack');

module.exports = {
    resolve: {
        modulesDirectories: [
            'node_modules',
            'src/web'
        ]
    },
    entry: {
        app: "./src/web/app.js"
    },
    devtool: 'source-map',
    output: {
        path: "./public/static/app/",
        publicPath: "/public/static/app/",
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/, loader: 'style!css'
            },
            {
                test: /\.html$/, loader: "html"
            },
            {
                test: /\.json$/, loader: 'json-loader'
            }
        ]
    },
    plugins: [
        //new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            filename: 'init.js'
        })
    ]
};
