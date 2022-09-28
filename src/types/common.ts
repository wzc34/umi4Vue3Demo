/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-05 15:56:43
 */
export type ResultVO = {
    code: number | string;
    data: any;
    message: string;
    page: number;
    row: number;
    total: number;
}
/**字典 */
export type DictionaryVo = {
    /** 字典的标签 */
    label: string;
    /** 字典的值 */
    value: number;

    order: string;
};