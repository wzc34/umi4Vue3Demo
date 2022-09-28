/*
 * @Description: 游戏管理
 * @Author: wangzhicheng
 * @Date: 2022-08-10 11:25:59
 */
import { defineStore } from 'pinia'
import * as gameServ from '@/services/game';
import * as commonServ from '@/services/common';
import { Dictionary } from '@/constants';

export const useGameStore = defineStore({
	id: 'game',
	state: () => ({
		userGameList: [] as any,
		loading: false,
		currentGame: null as any,
		gameList: [], // 游戏管理列表
		page: 1,
		total: 0, // 列表总条数
		gameTypeList: [] as any,
		gameStateList: [] as any,
		queryValue: '', // 搜索关键字
		selectGameList: [] as any,
	}),

	actions: {
		/**
		 * 卸载组件后state重置
		 */
		unmountState() {
			this.$patch({
				page: 1,
				total: 0,
				gameList: [],
				queryValue: '',
			})
		},
		clearCurrentGame() {
			this.$patch({
				currentGame: null as any,
				userGameList: [] as any,
			})
		},
		/**
		 * 游戏管理列表
		 * @param page 
		 * @param row 
		 */
		async findGameListPage(page, row) {
			this.loading = true
			const res = await gameServ.findGameListPage({ page, row, queryValue: this.queryValue })
			if (res?.data) {
				this.$patch({
					gameList: res.data,
					total: res.total,
					page: res.page,
				})
			}
			this.loading = false
		},
		/**
		 * 添加游戏
		 * @param params 
		 * @returns 
		 */
		async addGame(params) {
			const res = await gameServ.addGame(params)
			if (res?.code === '0') {
				this.findGameListPage(1, 10)
			}
			return res
		},
		/**
		 * 修改游戏
		 * @param id 
		 * @returns 
		 */
		async upateGame(params) {
			const res = await gameServ.upateGame(params)
			if (res?.code === '0') {
				this.findGameListPage(1, 10)
			}
			return res
		},
		/**
		 * 查询游戏
		 * @param id 
		 * @returns 
		 */
		async findGameById(id) {
			const res = await gameServ.findGameById({ id })
			if (res?.data) {
				return res.data
			}
		},
		/**
		 * 查询类型，状态字典
		 * @param dictCode 
		 */
		async findDictByCode(dictCode) {
			const res = await commonServ.findDictByCode({ dictCode })
			if (res?.data) {
				if (dictCode === Dictionary.type) this.gameTypeList = res.data
				if (dictCode === Dictionary.state) this.gameStateList = res.data
			}
		},
		/**
		 * 删除游戏
		 * @param dictCode 
		 */
		async deleteGameById(id) {
			const res = await gameServ.deleteGameById({ id })
			if (res?.code === '0') {
				this.findGameListPage(1, 10)
				return true
			}
		},
		/**
		 * 搜索游戏
		 * @param value 
		 */
		queryGameListPage(value) {
			this.queryValue = value
			this.findGameListPage(1, 10)
		},
		/**
		 * 
		 * @param page 
		 * @param row 
		 */
		async findGameList() {
			const res = await gameServ.findGameList({})
			if (res?.data) {
				this.selectGameList = res.data
			}
		},
		/**
		 * 当前用户下的游戏列表
		 */
		async findGamesByManager() {
			const res = await gameServ.findGamesByManager({})
			if (res?.data?.length > 0) {
				this.userGameList = res.data
				const _gameId = localStorage.getItem('gameId')
				const obj = res.data.find(item => item.id === _gameId)
				if (obj) {
					this.currentGame = obj
				} else {
					const gameId = res.data[0]?.id
					localStorage.setItem('gameId', gameId)
					this.currentGame = res.data[0]
				}
			}
		},
		/**
		 * 切换游戏
		 * @param value 
		 */
		onChangeGame(value: string) {
			const obj = this.userGameList.find(item => item.id === value)
			if (obj) {
				localStorage.setItem('gameId', value)
				this.currentGame = obj
			}
		}
	},
})
