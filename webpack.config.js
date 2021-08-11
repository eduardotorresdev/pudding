const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./ts/index",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
    hot: true,
    port: '3000'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './html/index.html'),
      favicon: path.resolve(__dirname, './html/favicon.ico')
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "babel-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          process.env.NODE_ENV !== "production"
          ? "style-loader"
          : MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
