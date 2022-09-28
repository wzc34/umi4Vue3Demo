/*
 * @Author: HZH
 * @Date: 2022-08-17 09:15:43
 * @LastEditors: HZH
 * @LastEditTime: 2022-08-17 09:23:22
 * @FilePath: \maintain\vue.config.js
 * @Description: 
 * 
 * 
 */
const { default: config } = require("config/config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

if (isProd) {
    config
        .plugin("html")
        .use(HtmlWebpackPlugin)
        .tap((args) => {
            args.cdn = assetsCDN.assets;
            return args;
        });
}

module.exports = {
    css: {
        loaderOptions: {
            less: { javascriptEnabled: true }
        }
    }
}