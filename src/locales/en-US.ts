/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-18 09:25:34
 */

import localeGame from '@/locales/locale/game/en-US'
import localeUser from '@/locales/locale/user/en-US'

export default {
	...localeGame,
	...localeUser,
	login: {
		title: "User Log In",
		username: "Username",
		password: "Password",
		button: {
			login: "Log in",
		},
		message: {
			username: "Please input your username",
			password: "Please input your password",
		}
	},
	menu: {
		home: "Home",
		monitor: "Monitor",
		app: "Apps",
		server: "Servers",
		game: "Games",
		user: "Users",
		billingPoint: "BillingPoints",
		agent: "Agents",
		service: "Service",
	},
	account: {
		logout: "Log out",
	},
	button: {
		query: "Search",
		add: "Add",
		edit: "Edit",
		delete: "Delete",
		back: 'Back',
	},
	search: {
		placeholder: 'Search'
	},
	modal: {
		confirm: {
			title: "Confirm",
			delete: "Are you sure delete {0} ?",
		}
	},
	title: {
		name: "name",
		type: "type",
		state: "state",
		remarks: "remarks",
		operation: "operation",
		createTime: "Create Time",
		total: 'Total {0} items',
	},
	message: {
		delete: {
			success: 'Delete succeeded',
		},
		add: {
			success: 'Added successfully',
		},
		edit: {
			success: 'Edit succeeded',
		},
	},
	notification: {
		error: {
			message: {
				requestError: "Request error",
				tip: "Tips",
				network: "Network exception",
			},
			description: {
				permission: "No permission",
				network: "Can not connect to server, please check network configuration.",
			}
		}
	},
	page: {
		notFind: 'Sorry, the page you visited does not exist.',
		loading: 'Loading',
		end: 'End',
	},
	common: {
		equipmentType: 'Equipment type',
		rechargeType: 'Recharge type',
		amountOfMoney: 'amount of money',
		currency: 'currency',
		prop: 'prop',
	},
	checkbox: {
		all: 'Check all',
	},
	dropdown: {
		all: 'All',
	},
	form: {
		required: 'Please input the {0}',
		requiredAdd: 'Please add a {0}',
	}
}