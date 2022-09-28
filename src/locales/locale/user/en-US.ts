/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-18 15:00:10
 */
export default {
	user: {
		query: {
			placeholder: "Please input username/realname/game",
		},
		button: {
			add: "Add User",
			edit: "Edit User",
		},
		column: {
			username: "Username",
			realName: "Realname",
			sex: "Sex",
			telephone: "Telephone",
			email: "Email",
			role: "Role",
			gameList: "Game",
			createTime: "Create Time",
			operation: "Operation",
			remark: "Remark",
			headImg: "Avatar",
		},
		form: {
			upload: {
				headImg: "Upload",
				size: 'Image must smaller than {0}MB',
				type: 'You can only upload {0} file',
			},
			password: "Password",
			confirmPassword: "confirmPassword",
			message: {
				username: "Please input username",
				password: "Please input password",
				validate: {
					password: "Please input 8-32 characters of letters, numbers, symbols, including at least two combinations",
					email: "Please input the correct email",
					inconsistent: "The two password inputs are inconsistent",
				},
				confirmPassword: "Please input confirmPassword",
				update: "Optional",
				realName: "Please input realname",
				sex: "Please input sex",
				role: "Please input role",
				gameList: "Please input game",
				telephone: "Please input telephone",
				email: "Please input email",
				remark: "Please input remark",
			}
		}
	}
}