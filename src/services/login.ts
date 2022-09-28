/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-05 15:51:02
 */
import request from '../utils/request';

export async function login(params: {
	username: string,
	password: string,
}) {
	return request('/login', {
		data: params,
		requestType: 'form',
	});
}

export async function logout(params: {
}) {
	return request('/logout', {
		data: params,
	});
}