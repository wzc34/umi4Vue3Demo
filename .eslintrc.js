/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-04 17:53:46
 */
module.exports = {
    extends: ["eslint:recommended"], // 继承 eslint 规则
    env: {
        node: true, // 启用node中全局变量
        browser: true, // 启用浏览器中全局变量
    },
    globals: {
        document: true,
        window: true
    },
    plugins: ["vue", "@typescript-eslint"],
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 6, // es6
        sourceType: 'module', // es
    },
    rules: {
        "no-var": 2, // 不能使用 var 定义变量
        "no-unused-vars": 0,
        "no-undef": 0,
    }
}