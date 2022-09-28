<!--
 * @Description: 入口
 * @Autor: wangzc
 * @Date: 2022-08-06 10:34:24
-->
<template>
	<a-config-provider :locale="global.locale === 'enUS' ? enUS : zhCN">
		<router-view></router-view>
	</a-config-provider>
</template>
<script lang="ts" setup>
import { useGlobalStore } from "@/stores/global";
import { useUserStore } from "@/stores/user";
import eventBus, { EVENT_TYPE } from "@/utils/eventBus";
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import { useRouter } from 'umi';

const user = useUserStore()
const router = useRouter()
const global = useGlobalStore()

const localeObj = {
	enUS: 'en',
	zhCN: 'zh-cn',
}
//默认英文
dayjs.locale(localeObj[global.locale]);

/**
 * 退出
 */
eventBus.on(EVENT_TYPE.LOGOUT, () => {
	router.replace('/login')
	user.cleartToken()
})

</script>
