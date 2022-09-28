/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-12 09:49:35
 */
import request from '../utils/request';

/**
 * 字典
 * @param params 
 * @returns 
 */
export async function findDictByCode(params: {
    dictCode: string,
}) {
    return request('/system/findDictByCode', {
        data: params,
    });
}

/**
 * 字典
 * @param params 
 * @returns 
 */
export async function findDictByCodeByGms(params: {
    dictCode: string,
}) {
    return request('/game/dict/findDictByCode', {
        data: params,
    });
}