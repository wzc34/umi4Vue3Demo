/*
 * @Description: 
 * @Autor: wangzc
 * @Date: 2022-08-06 11:37:38
 */
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import { createPinia } from 'pinia';
import { i18n } from './i18n';
import { useGlobalStore } from './stores/global';
// echarts
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition
]);


export async function onAppCreated({ app }: any) {
    app.use(Antd);
    app.use(createPinia())
    app.use(i18n)
}

export async function onMounted({ app, router }: any) {
    // console.log('onMounted', app, router);
    // 此处写路由拦截
    router.beforeEach((to: any, from: any, next: Function) => {
        const global = useGlobalStore()
        global.setSelectedKeys(to.path)
        // console.log('router beforeEach', to, from);

        next();
    });
}