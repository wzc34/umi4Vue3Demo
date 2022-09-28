<!--
 * @Description: 
 * @Autor: wangzc
 * @Date: 2022-08-06 10:34:24
-->
<template>
	<div>我是{{ name }} </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

let name = ref("首页");

</script>