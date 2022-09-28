/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-08 14:26:07
 */
import request from '../utils/request';

export async function getManagerInfo(
    params: {}
) {
    return request('/manager/getManagerInfo', {
        data: params,
    });
}
/**
 * 用户管理列表
 * @param params 
 * @returns 
 */
export async function findManagerListPage(params: {
    page: number,
    row: number,
    queryValue: string,
}) {
    return request('/manager/findManagerListPage', {
        data: params,
    });
}

/**
 * 添加用户
 * @param params 
 * @returns 
 */
export async function addManager(params: {
    username: string,
    password: string,
    realName: string,
    sex: string,
    telephone: string,
    email: string,
    role: string,
    remark: string,
    headImg: string,
    managerList: string,
}) {
    return request('/manager/addManager', {
        data: params,
    });
}

/**
 * 修改用户
 * @param params 
 * @returns 
 */
export async function upateManager(params: {
    id: string,
    username: string,
    password?: string,
    realName: string,
    sex: string,
    telephone: string,
    email: string,
    role: string,
    remark: string,
    headImg: string,
    managerList: string,
}) {
    return request('/manager/upateManager', {
        data: params,
    });
}

/**
 * 查询用户
 * @param params 
 * @returns 
 */
export async function findManagerById(params: {
    id: string,
}) {
    return request('/manager/findManagerById', {
        data: params,
    });
}
/**
 * 删除用户
 * @param params 
 * @returns 
 */
export async function deleteManagerById(params: {
    id: string,
}) {
    return request('/manager/deleteManagerById', {
        data: params,
    });
}