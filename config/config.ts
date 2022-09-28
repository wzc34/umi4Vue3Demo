/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-05 13:19:20
 */
//umi4 默认不兼容 IE

import { defineConfig } from 'umi'
import routes from './routes'

export default defineConfig({
    npmClient: 'npm',
    presets: [require.resolve('@umijs/preset-vue')],
    routes,
    title: '游戏运维平台',
    base: '/',
    publicPath: '/',
    history: { type: 'hash' },
    fastRefresh: true,
    mfsu: false,
    targets: {
        chrome: 60,
    },
    theme: { '@primary-color': '#2D72E0' }
})