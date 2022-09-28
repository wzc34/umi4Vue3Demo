/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-15 09:57:40
 */
import server from "./server";

const assetDir = "static";

export default {
    hash: true,
    define: {
        "process.env.apiUrl": server.url,
    },
    base: '/',
    publicPath: server.publicPath,
    chainWebpack(config, { env, webpack, createCSSRule }) {
        // 修改js chunk文件输出目录
        config.output
            .filename('[name].[hash:8].js')
            .chunkFilename(`${assetDir}/js/[name].[contenthash:8].async.js`)

        // 修改css输出目录
        config.plugin('mini-css-extract-plugin').tap(() => [
            {
                filename: `[name].[contenthash:8].css`,
                chunkFilename: `${assetDir}/css/[name].[contenthash:8].chunk.css`,
                ignoreOrder: true
            },
        ]);

        // 修改图片输出目录
        // config.module
        //     .rule("images")
        //     .test(/\.(jpg|jpeg|png|gif|ico)$/)
        //     .use("url-loader")
        //     .loader(require.resolve("@umijs/bundler-webpack/compiled/url-loader"))
        //     .options({
        //         limit: 1024 * 12,// 小于12kb的图片压缩成base64
        //         name: `${assetDir}/img/[name].[contenthash:8].[ext]`,
        //         esModule: false,
        //     })
    },
}
