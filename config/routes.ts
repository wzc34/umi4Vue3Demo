/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-05 13:19:54
 */
export default [
  {
    path: '/login',
    name: 'login',
    component: '@/pages/login.vue'
  },
  {
    path: '/',
    component: '@/layouts/index.vue',
    wrappers: ['@/wrappers/index.vue'],
    routes: [
      { path: '/home', component: '@/pages/home/index.vue' },
      { path: '/game', component: '@/pages/game/index.vue' },
      { path: '/user', component: '@/pages/user/index.vue' },
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/:catchAll(.*)',
        component: '@/pages/404.vue',
      },
    ]
  },

]