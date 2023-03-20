const {resolve}           = require("path");
const HtmlWebpackPlugin   = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = function () {

    return {
        context: resolve(__dirname, "."),
        mode:  "development",
        entry: {
            main: "./src/main.ts",
        },
        output: {
            path:     resolve(__dirname, "./dist"),
            filename: "[name].app.js",
        },
        module: {
            rules: [
                {
                    test:    /\.tsx?$/,
                    use:     'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test:   /\.css$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {},
                        },
                    ],
                },
                {
                    test:    /\.riot$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "@riotjs/webpack-loader",
                            options: {

                                hot: false,
                                // @ todo : compiler options
                            },
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".riot"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: false,
                templateContent: ({htmlWebpackPlugin}) => `
                    <!DOCTYPE html>
                    <html>
                      <head>
                        ${htmlWebpackPlugin.tags.headTags}
                      </head>
                      <body>
                        <div id="root"></div>
                        ${htmlWebpackPlugin.tags.bodyTags}
                      </body>
                    </html>
                  `,
            }),
        ]
    };
}
