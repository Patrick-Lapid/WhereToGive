const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg|ico)(\?[a-z0-9=.]+)?$/,
                use: ["url-loader?limit=100000"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
