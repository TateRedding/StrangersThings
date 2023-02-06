module.exports = {
    module: {
        rules: [
            {
                exclude: /node-modules/,
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react']
                        }
                    }
                ]
            },
            {
                exclude: /node-modules/,
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    watchOptions : {
        poll: true,
        ignored: /node-modules/
    }
}