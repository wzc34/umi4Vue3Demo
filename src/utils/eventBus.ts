/*
 * @Description: 监听事件
 * @Author: wangzhicheng
 * @Date: 2022-08-17 09:41:49
 */
import { EventEmitter } from 'events';

export default new EventEmitter();

/** 事件类型 **/
export const EVENT_TYPE = {
    'LOGOUT': 'logout',
    'APP_LIST_CHANGE_BY_GAME': 'appListChangeByGame',
}
