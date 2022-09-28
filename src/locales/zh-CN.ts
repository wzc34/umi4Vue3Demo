/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-18 09:25:34
 */

import localeGame from '@/locales/locale/game/zh-CN'
import localeUser from '@/locales/locale/user/zh-CN'

export default {
    ...localeGame,
    ...localeUser,
    login: {
        title: "用户登录",
        username: "用户名",
        password: "密码",
        button: {
            login: "登录",
        },
        message: {
            username: "请输入用户名",
            password: "请输入密码",
        }
    },
    menu: {
        home: "首页",
        monitor: "监控中心",
        app: "包管理",
        server: "区服管理",
        game: "游戏管理",
        user: "用户管理",
        billingPoint: "计费点管理",
        agent: "主机管理",
        service: "服务管理",
    },
    account: {
        logout: "退出",
    },
    button: {
        query: "查询",
        add: "添加",
        edit: "编辑",
        delete: "删除",
        back: '返回',
    },
    search: {
        placeholder: '搜索'
    },
    modal: {
        confirm: {
            title: "提示",
            delete: "确定删除 {0} 吗?",
        }
    },
    title: {
        name: "名称",
        type: "类型",
        state: "状态",
        remarks: "备注",
        createTime: "创建时间",
        operation: "操作",
        total: '总数 {0} 条',
    },
    message: {
        delete: {
            success: '删除成功',
        },
        add: {
            success: '新增成功',
        },
        edit: {
            success: '编辑成功',
        },
    },
    notification: {
        error: {
            message: {
                requestError: "请求错误",
                tip: "提示",
                network: "网络异常",
            },
            description: {
                permission: "没有权限",
                network: "您的网络发生异常，无法连接服务器",
            }
        }
    },
    page: {
        notFind: '对不起, 您访问的页面不存在。',
        loading: '正在加载',
        end: '已经到底了~',
    },
    common: {
        equipmentType: '设备类型',
        rechargeType: '充值类型',
        amountOfMoney: '金额',
        currency: '币种',
        prop: '道具',
    },
    checkbox: {
        all: '全选',
    },
    dropdown: {
        all: '全部',
    },
    form: {
        required: '请输入{0}',
        requiredAdd: '请添加{0}',
    }
}