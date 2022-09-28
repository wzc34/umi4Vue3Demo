/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-19 13:38:13
 */
import { useUserStore } from "@/stores/user";
import { notification } from "ant-design-vue";
import * as userServ from '@/services/user'
import { i18n } from "@/i18n";
const { t } = i18n.global;
const user = useUserStore();

/**
 * 是否是超级管理员，不是则弹出没有权限的提示
 * @returns 
 */
export const isAdmin = async () => {
    const superRole = (currentUser) => {
        if (!!currentUser && currentUser?.role !== 'ROLE_SUPER_ADMIN') {
            notification.error({ message: t('notification.error.message.tip'), description: t('notification.error.description.permission') })
            return true
        }
        return false
    }
    if (!user.currentUser) {
        const res = await userServ.getManagerInfo({})
        if (res?.data) {
            const user = res.data
            return superRole(user)
        }
    } else {
        return superRole(user.currentUser)
    }
    return false

}
