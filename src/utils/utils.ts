/*
 * @Description: 公共方法
 * @Author: wangzhicheng
 * @Date: 2021-03-30 19:19:22
 */
import moment from 'moment';
const datemonth = 'YYYY-MM'
export const dateformat = 'YYYY-MM-DD'
export const datetime = 'YYYY-MM-DD HH:mm:ss';

/**
 * 验证手机号
 * @param phone 
 * @returns 
 */
export function validatePhone(phone) {
	const reg = /^1[3456789]\d{9}$/
	return reg.test(phone)
}

/**
 * 验证ip
 * @param phone 
 * @returns 
 */
export function validateIP(phone) {
	const reg = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g
	return reg.test(phone)
}

/**
 * 验证密码
 * @param pwd 
 * @returns 
 */
export function validatePwd(pwd) {
	const len = pwd.length
	// const reg = /(?=[A-Za-z0-9]{8,20})(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+/
	// const reg = /^[A-Za-z]+[0-9]+$/;
	// const reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,20}$/;
	const reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{0,100}$/;
	return reg.test(pwd) && len >= 8
}

/**
 * 正整数
 * @param value 
 */
export function validateNum(value) {
	const reg = /^\+?[1-9][0-9]*$/;
	return reg.test(value)
}

/**
 * 整数
 * @param value 
 * @returns 
 */
export function validateInt(value) {
	const reg = /^\-{0,1}[0-9]{1,}$/;
	return reg.test(value)
}

/**
 * 数字，可以有小数点
 * @param value 
 * @returns 
 */
export function validateFloat(value) {
	const reg = /^-?\d+(,\d{3})*(\.\d{1,20})?$/
	// const reg = /^-?(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
	return reg.test(value)
}

/**
 * 邮箱验证正则
 */
export function validateEmail(email) {
	const reg = /^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
	return reg.test(email);
}

export function timeStr(momentObj) {
	return momentObj.format(dateformat)
}

/**
 * unix转日期
 * @param time 
 * @param isHour 是否显示时分秒
 * @returns 
 */
export function unixToStr(time: number, isHour = false) {
	if (!time || time === 0) return '--'
	return moment.unix(time).utcOffset(8).format(isHour ? datetime : dateformat)
}

/**
 * 日期转unix
 * @param dateStr 
 * @returns 
 */
export function strToUnix(dateStr: string) {
	return moment(dateStr).unix()
}

