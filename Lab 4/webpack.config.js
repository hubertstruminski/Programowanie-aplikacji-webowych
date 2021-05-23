const path = require( 'path' );

module.exports = {
    mode: 'development',
    entry: './src/AppNotes.ts',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'AppNotes.js',
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    }
};