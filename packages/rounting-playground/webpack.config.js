const path = require('path')
const webpack = require('webpack')
const ip = require('ip')

const host = 'localhost' // ip.address()
const port = 8081
module.exports = {
    mode: "development",
    entry: {
        front: [

            //'webpack-dev-server/client?http://' + host + ':' + port,
            "./src/index.tsx"
        ],
    },

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './dist'),
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    plugins: [
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /.ts?$|.tsx?$/,
                exclude: /\.story\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // disable type checker - we will use it in fork plugin
                            transpileOnly: true,
                            allowTsInNodeModules: true
                        },
                    },
                ],
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                loader: 'image-webpack-loader'
            }
        ]
    },
    /*externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },*/
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    /*  externals: {
          "react": "React",
          "react-dom": "ReactDOM"
      },*/

    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port,
        //  hot: true,
        inline: true,
        host,
        headers: { 'Access-Control-Allow-Origin': '*' }
    }
}
