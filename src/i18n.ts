/*
 * @Description: 国际化
 * @Author: wangzhicheng
 * @Date: 2022-08-19 13:28:45
 */

import { createI18n } from 'vue-i18n';
import enUS from './locales/en-US'
import zhCN from './locales/zh-CN'
import { defaultLang } from './constants';
const defaultLocale = localStorage.getItem('locale') || defaultLang

export const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,// 默认语言
    fallbackLocale: defaultLang,// 不存在默认则为英文
    globalInjection: true,
    messages: {
        enUS, zhCN
    }
})
