import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const config = {
	devtool: "source-map",
	mode: "development",
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve("src/html/index.html"),
		}),
		new MiniCssExtractPlugin()
	],
    stats: {
        // show sass logging in console
        loggingDebug: /sass/,
    },
	module: {
		rules: [
			{
				test: /\.html?$/i,
				use: ['html-loader']
			},
			// Image assets
			{
				test: /\.(png|svg|jpe?g|gif)$/i,
				type: "asset"
			},
			// Font assets
			{
				test: /\.(woff2?|eot|ttf|otf)$/i,
				type: "asset"
			},
            // Sass
            {
                test: /\.s?css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
		]
	},
	devServer: {
		static: { directory: path.resolve("dist") },
		open: true,
        hot: false, //Anders werkt liveReload niet.
        liveReload: true
	},
	output: {
		// Maakt de 'dist' folder leeg alvorens nieuwe files te genereren.
		clean: true,
	},
	/**
	 * Het "output" veld kan verder gebruikt worden om de webpack defaults (output folder: 'dist', filename voor bundle: 'main.js') aan te passen
	 * naar je eigen voorkeuren (bv. 'build' wordt ook veel gebruikt)
	 * output: {
	 *  filename: "main.js",
	 *  path: path.resolve(__dirname, "dist"),
	 *  clean: true,
	 * },
	 */
};
export default config
