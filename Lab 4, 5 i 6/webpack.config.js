const path = require( 'path' );

module.exports = {
    mode: 'development',
    entry: ['./src/AppNotes.ts', './src/style.scss'],
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'AppNotes.js',
    },
    resolve: {
        extensions: [ '.ts', '.js', '.css', '.scss' ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                loader: 'url-loader'
            },
            {
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'css/[name].blocks.css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			}
        ]
    }
};