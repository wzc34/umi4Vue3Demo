/*
 * @Description: 用户管理
 * @Author: wangzhicheng
 * @Date: 2022-08-08 11:36:50
 */

import { defineStore } from 'pinia'
import * as logServ from '@/services/login'
import * as userServ from '@/services/user'
import * as commonServ from '@/services/common'
import { Md5 } from 'ts-md5'
import { useGameStore } from './game'
import { Dictionary } from '@/constants'

export const useUserStore = defineStore({
	id: 'user',
	state: () => ({
		currentUser: null as any,
		token: sessionStorage.getItem('token'),
		loading: false,
		userList: [], // 用户管理列表
		page: 1,
		total: 0, // 列表总条数
		sexList: [] as any,
		roleList: [] as any,
		queryValue: '', // 搜索关键字
		loginLoading: false,
	}),

	actions: {
		/**
		 * 卸载组件后state重置
		 */
		unmountState() {
			this.$patch({
				page: 1,
				total: 0,
				userList: [],
				queryValue: '',
			})
		},
		/**
		 * 退出
		 */
		async logout() {
			return await logServ.logout({})
		},
		/**
		 * 清除登录信息
		 */
		cleartToken() {
			this.$patch({
				currentUser: null as any,
				token: null,
			})
			sessionStorage.removeItem('token')
			localStorage.removeItem('gameId')
			// 清除当前的头部游戏列表
			const game = useGameStore()
			game.clearCurrentGame()
		},
		/**
		 * 登录
		 * @param username 
		 * @param password 
		 */
		async login(username, password) {
			this.loginLoading = true
			const res = await logServ.login({ username, password })
			if (res?.data) {
				const user = res.data
				sessionStorage.setItem('token', user?.token)
				this.$patch({
					currentUser: user,
					token: user?.token
				})
			}
			this.loginLoading = false
		},
		/**
		 * 获取用户信息
		 */
		async getManagerInfo() {
			const res = await userServ.getManagerInfo({})
			if (res?.data) {
				const user = res.data
				this.$patch({
					currentUser: user,
				})
			}
		},
		/**
		 * 用户管理列表
		 * @param page 
		 * @param row 
		 */
		async findManagerListPage(page, row) {
			this.loading = true
			const res = await userServ.findManagerListPage({ page, row, queryValue: this.queryValue })
			if (res?.data) {
				this.$patch({
					userList: res.data,
					total: res.total,
					page: res.page,
				})
			}
			this.loading = false
		},
		/**
		 * 添加用户
		 * @param params 
		 * @returns 
		 */
		async addManager(params) {
			delete params.confirmPassword
			let pwd = params.password
			if (pwd) pwd = Md5.hashStr(pwd).toString();
			const res = await userServ.addManager({ ...params, ...(pwd ? { password: pwd } : null) })
			if (res?.code === '0') {
				this.findManagerListPage(1, 10)
			}
			return res
		},
		/**
		 * 修改用户
		 * @param id 
		 * @returns 
		 */
		async upateManager(params) {
			delete params.confirmPassword
			let pwd = params.password
			if (pwd) pwd = Md5.hashStr(pwd).toString();
			const res = await userServ.upateManager({ ...params, ...(pwd ? { password: pwd } : null) })
			if (res?.code === '0') {
				this.findManagerListPage(1, 10)
			}
			return res
		},
		/**
		 * 查询用户
		 * @param id 
		 * @returns 
		 */
		async findManagerById(id) {
			const res = await userServ.findManagerById({ id })
			if (res?.data) {
				return res.data
			}
		},
		/**
		 * 查询性别，角色字典
		 * @param dictCode 
		 */
		async findDictByCode(dictCode) {
			const res = await commonServ.findDictByCode({ dictCode })
			if (res?.data) {
				if (dictCode === Dictionary.sex) this.sexList = res.data
				if (dictCode === Dictionary.role) this.roleList = res.data
			}
		},
		/**
		 * 删除用户
		 * @param dictCode 
		 */
		async deleteManagerById(id) {
			const res = await userServ.deleteManagerById({ id })
			if (res?.code === '0') {
				this.findManagerListPage(1, 10)
				return true
			}
		},
		/**
		 * 搜索用户
		 * @param value 
		 */
		queryManagerListPage(value) {
			this.queryValue = value
			this.findManagerListPage(1, 10)
		},
	},
})
