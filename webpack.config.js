const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const src = path.resolve(__dirname, "src");
const out = path.resolve(__dirname, "debug");

module.exports = (env, argv) => ({
	entry: ["babel-polyfill", src + "/jsx/index.jsx"],
	output: {
		path: out + "/js",
		publicPath: "/",
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: ["babel-loader"],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				use: ["url-loader?limit=1024"]
			},
			{
				test: /\.(png|jpg|ico)$/,
				use: ["url-loader?limit=8192"]
			},
			{
				test: /\.scss$/,
				use: [
					argv.mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader", // translates CSS into CommonJS
					"sass-loader" // compiles Sass to CSS
				]
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				use: ["svg-react-loader"]
			}
		]
	},
	plugins: [
		new Dotenv({
			systemvars: true
		}),
		new HtmlWebpackPlugin({
			template: src + "/templates/index.html"
		}),
		new CopyWebpackPlugin([{ from: "static/**/*", to: "", flatten: true }]),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "[name].css",
			chunkFilename: "[id].css"
		}),
		new FaviconsWebpackPlugin(src + "/img/logo-small.png")
	],
	resolve: {
		alias: {
			"react-dom": "@hot-loader/react-dom" // As recommended in the docs https://www.npmjs.com/package/react-hot-loader#hot-loaderreact-dom
		}
	},
	devServer: {
		contentBase: out,
		port: 9000,
		historyApiFallback: true
	}
});
