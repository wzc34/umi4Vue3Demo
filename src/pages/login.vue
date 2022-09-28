<!--
 * @Description: 登录
 * @Autor: wangzc
 * @Date: 2022-08-06 10:34:24
-->
<template>
    <div class="login-form-box">
        <h1 style="margin-bottom: 50px">{{ t("login.title") }}</h1>
        <a-form
            :model="formState"
            layout="vertical"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                :label="t('login.username')"
                name="username"
                :rules="[{ required: true, message: t('login.message.username') }]"
            >
                <a-input v-model:value="formState.username" size="large" />
            </a-form-item>

            <a-form-item
                :label="t('login.password')"
                name="password"
                :rules="[{ required: true, message: t('login.message.password') }]"
            >
                <a-input-password v-model:value="formState.password" size="large" />
            </a-form-item>

            <a-form-item>
                <a-button
                    type="primary"
                    html-type="submit"
                    size="large"
                    :loading="user.loginLoading"
                    >{{ t("login.button.login") }}</a-button
                >
            </a-form-item>
        </a-form>
    </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/user";
import { Md5 } from "ts-md5";
import { useRouter } from "umi";
import { reactive } from "vue";
import useLocale from "@/utils/useLocale";
const {
    i18n: { t },
} = useLocale();

interface FormState {
    username: string;
    password: string;
}
const user = useUserStore();
const router = useRouter();

const formState = reactive<FormState>({
    username: "",
    password: "",
});

const onFinish = async (values: any) => {
    const password: string = Md5.hashStr(values.password).toString();
    await user.login(values.username, password);
    if (user.currentUser) router.replace("/home");
};

const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
};
</script>
<style lang="less">
.login-form-box {
    position: absolute;
    top: 10%;
    left: 50%;
    margin: 0 0 0 -200px;
    width: 400px;
}
</style>
