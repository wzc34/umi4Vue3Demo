<!--
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-25 11:25:24
-->

<template>
    <BasicLayout v-if="!!user.currentUser || !!user.token">
        <router-view></router-view>
    </BasicLayout>
</template>
<script lang="ts" setup>
import BasicLayout from "@/components/BasicLayout.vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from 'umi';

const user = useUserStore()
const router = useRouter()

if (!user.currentUser) {
    if (user.token) {
        user.getManagerInfo()
    } else {
        router.replace('/login')
    }
}
</script>