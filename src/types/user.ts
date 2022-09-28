import { IGame } from "./game";

/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-17 16:08:19
 */
export interface IUser {
    id?: undefined,
    username: string,
    password: string,
    confirmPassword: string,
    realName: string,
    sex: undefined,
    telephone: string,
    email: string,
    role: undefined,
    remark: string,
    headImg: string,
    gameList: Array<string> | undefined,
}