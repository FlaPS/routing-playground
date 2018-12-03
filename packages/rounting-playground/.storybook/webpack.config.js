const path = require('path');

module.exports = (baseConfig, env, config) => {

    config.resolve = {
        extensions: ['.ts', '.tsx', '.js', '.json']
    }

    config.module.rules.push(
        {
            test: /\.(ts|tsx|js|jsx)$/,
            loader: "ts-loader",
            options: {
                transpileOnly: true,
                allowTsInNodeModules: true
            }
        },   
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ]
        },
        {
            test: /\.scss$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[hash:base64:4]',
                    },
                },
                {
                    loader: 'sass-loader',
                },
            ]
        },);
      
      
    // Extend it as you need.

    // For example, add typescript loader:
  /* config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: path.resolve(__dirname, '../src'),
        loader: require.resolve('awesome-typescript-loader'),
        options: {
            configFileName: 'tsconfig.frontend.json'
        },
    });
    config.resolve.extensions.push('.ts', '.tsx');*/
    config.module.rules.push({
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loaders: ['file-loader'],
        include: path.resolve(__dirname, '../')
    })

    return config;
};