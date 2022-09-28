/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-09 13:25:35
 */
import { defaultLang } from '@/constants'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore({
	id: 'global',
	state: () => ({
		selectedKeys: ['/home'], // 菜单展开
		locale: localStorage.getItem('locale') || defaultLang
	}),

	actions: {
		/**
		 * 修改selectedKeys值
		 */
		setSelectedKeys(key) {
			this.selectedKeys[0] = key
		},
		changeLocale(value) {
			this.locale = value
		}
	},
})
