/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-18 09:25:34
 */
export default {
    user: {
        query: {
            placeholder: "请输入用户名\真实姓名\游戏",
        },
        button: {
            add: "添加用户",
            edit: "编辑用户",
        },
        column: {
            username: "用户名",
            realName: "真实姓名",
            sex: "性别",
            telephone: "电话号码",
            email: "邮箱",
            role: "角色",
            gameList: "游戏",
            createTime: "创建时间",
            operation: "操作",
            remark: "备注",
            headImg: "头像",
        },
        form: {
            upload: {
                headImg: "上传头像",
                size: '图片大小不能超过{0}MB',
                type: '只能上传 {0} 图片',
            },
            password: "密码",
            confirmPassword: "确认密码",
            message: {
                username: "请输入用户名",
                password: "请输入密码",
                validate: {
                    password: "请输入8-32位字符的字母+数字+符号，至少包含两种组合",
                    email: "请输入正确的邮箱",
                    inconsistent: "两次密码输入不一致",
                },
                confirmPassword: "请输入确认密码",
                update: "不修改密码可不填",
                realName: "请输入真实姓名",
                sex: "请输入性别",
                role: "请选择角色",
                gameList: "请选择游戏",
                telephone: "请输入电话号码",
                email: "请输入邮箱",
                remark: "请输入备注",
            }
        }
    }
}