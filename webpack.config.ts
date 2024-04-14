import path from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import webpack from "webpack"
import { Configuration as WebpackConfiguration } from "webpack-dev-server"
import MiniCssExtractPlugin from "mini-css-extract-plugin"

type Mode = "development" | "production"

interface IEnv {
  mode: Mode
}

export default (env: IEnv) => {
  const isDev: boolean = env.mode === "development"
  const configuration: webpack.Configuration = {
    entry: path.resolve(__dirname, "src", "index.ts"),
    mode: env.mode || "development",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
        filename: "index.html",
        inject: "body",
        favicon: path.resolve(__dirname, "icon.png"),
      }),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: isDev ? "source-map" : false,
    devServer: isDev
      ? {
          port: 3000,
          open: true,
        }
      : undefined,
  }

  return configuration
}
