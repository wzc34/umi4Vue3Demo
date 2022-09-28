<!--
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-25 13:41:57
-->
<template>
    <a-result status="404" title="404" :sub-title="t('page.notFind')">
        <template #extra>
            <a-button type="primary" @click="router.replace('/')">{{ t('button.back') }}</a-button>
        </template>
    </a-result>
</template>

<script lang="ts" setup>
import { useRouter } from 'umi';
import useLocale from '@/utils/useLocale';

const { i18n: { t } } = useLocale()
const router = useRouter()
</script>