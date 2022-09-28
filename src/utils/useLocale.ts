/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-18 10:32:56
 */

import { useGlobalStore } from "@/stores/global";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export default function useLocale() {
    const i18n = useI18n();//实例化i18n
    const global = useGlobalStore();
    const currentLocale = computed(() => {
        return i18n.locale.value // 固定写法 获取当前语言设置
    })
    // 切换语言
    const changeLocale = (value: string) => {
        i18n.locale.value = value;//赋值切换语言
        localStorage.setItem('locale', value);//修改本地存储
        global.changeLocale(value)
    }
    return {
        i18n,
        currentLocale,
        changeLocale
    }
}