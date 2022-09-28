<!--
 * @Description: 用户信息
 * @Author: wangzhicheng
 * @Date: 2022-08-16 09:49:28
-->
<template>
    <a-modal
        :visible="visible"
        :maskClosable="false"
        :confirmLoading="confirmLoading"
        :destroyOnClose="true"
        :width="800"
        :title="opt === 'add' ? t('user.button.add') : t('user.button.edit')"
        @ok="onOk"
        @cancel="onCancel"
    >
        <a-form ref="modalFormRef" name="myform" :model="userInfo" v-bind="layout">
            <a-form-item name="headImg" :label="t('user.column.headImg')">
                <a-upload
                    name="avatar"
                    list-type="picture-card"
                    class="avatar-uploader"
                    :show-upload-list="false"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                >
                    <img v-if="userInfo.headImg" :src="userInfo.headImg" alt="avatar" />
                    <div v-else>
                        <plus-outlined></plus-outlined>
                        <div class="ant-upload-text">
                            {{ t("user.form.upload.headImg") }}
                        </div>
                    </div>
                </a-upload>
            </a-form-item>
            <a-form-item
                name="username"
                :label="t('user.column.username')"
                :rules="[{ required: true, message: t('user.form.message.username') }]"
            >
                <a-input
                    v-model:value="userInfo.username"
                    :maxlength="50"
                    :placeholder="t('user.form.message.username')"
                    autocomplete="off"
                    :disabled="opt === 'add' ? false : true"
                />
            </a-form-item>
            <a-form-item
                name="password"
                :label="t('user.form.password')"
                :rules="[
                    {
                        required: opt === 'update' ? false : true,
                        trigger: 'change',
                        validator: validatePass,
                    },
                ]"
            >
                <a-input-password
                    v-model:value="userInfo.password"
                    :maxlength="50"
                    autocomplete="off"
                    :placeholder="
                        opt === 'update'
                            ? t('user.form.message.update')
                            : t('user.form.message.password')
                    "
                />
            </a-form-item>
            <a-form-item
                name="confirmPassword"
                :label="t('user.form.confirmPassword')"
                :rules="[
                    {
                        required: opt === 'update' ? false : true,
                        trigger: 'change',
                        validator: validatePass2,
                    },
                ]"
            >
                <a-input-password
                    v-model:value="userInfo.confirmPassword"
                    :maxlength="50"
                    autocomplete="off"
                    :placeholder="
                        opt === 'update'
                            ? t('user.form.message.update')
                            : t('user.form.message.confirmPassword')
                    "
                />
            </a-form-item>
            <a-form-item
                name="realName"
                :label="t('user.column.realName')"
                :rules="[{ required: true, message: t('user.form.message.realName') }]"
            >
                <a-input
                    v-model:value="userInfo.realName"
                    :maxlength="50"
                    :placeholder="t('user.form.message.realName')"
                />
            </a-form-item>
            <a-form-item
                name="sex"
                :label="t('user.column.sex')"
                :rules="[{ required: true, message: t('user.form.message.sex') }]"
            >
                <a-select
                    v-model:value="userInfo.sex"
                    :placeholder="t('user.form.message.sex')"
                    :options="user.sexList"
                >
                </a-select>
            </a-form-item>
            <a-form-item
                name="role"
                :label="t('user.column.role')"
                :rules="[{ required: true, message: t('user.form.message.role') }]"
            >
                <a-select
                    v-model:value="userInfo.role"
                    :placeholder="t('user.form.message.role')"
                    :options="user.roleList"
                >
                </a-select>
            </a-form-item>
            <a-form-item
                name="gameList"
                :label="t('user.column.gameList')"
                :rules="[{ required: true, message: t('user.form.message.gameList') }]"
            >
                <a-select
                    v-model:value="userInfo.gameList"
                    mode="multiple"
                    :placeholder="t('user.form.message.gameList')"
                >
                    <template v-for="item in game.selectGameList" :key="item.id">
                        <a-select-option v-if="!!item.id" v-model:value="item.id">{{
                            item.name
                        }}</a-select-option>
                    </template>
                </a-select>
            </a-form-item>
            <a-form-item name="telephone" :label="t('user.column.telephone')">
                <a-input
                    v-model:value="userInfo.telephone"
                    :maxlength="20"
                    :placeholder="t('user.form.message.telephone')"
                />
            </a-form-item>
            <a-form-item
                name="email"
                :label="t('user.column.email')"
                :rules="[{ trigger: 'change', validator: validateEmailInput }]"
            >
                <a-input
                    v-model:value="userInfo.email"
                    :maxlength="50"
                    :placeholder="t('user.form.message.email')"
                />
            </a-form-item>
            <a-form-item name="remark" :label="t('user.column.remark')">
                <a-textarea
                    v-model:value="userInfo.remark"
                    show-count
                    :maxlength="200"
                    :placeholder="t('user.form.message.remark')"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script lang="ts" setup>
import { useGameStore } from "@/stores/game";
import { useUserStore } from "@/stores/user";
import { validateEmail, validatePwd } from "@/utils/utils";
import { PlusOutlined } from "@ant-design/icons-vue";
import type { UploadChangeParam } from "ant-design-vue";
import { FormInstance, message } from "ant-design-vue";
import type { Rule } from "ant-design-vue/es/form";
import { reactive, ref, toRaw, toRefs } from "vue";
import { IUser } from "@/types/user";
import useLocale from "@/utils/useLocale";
const {
    i18n: { t },
} = useLocale();

interface IProps {
    opt: string;
    userInfo: IUser;
    visible: boolean;
}

function getBase64(img: any, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

const game = useGameStore();
const user = useUserStore();
const modalFormRef = ref<FormInstance>();
const confirmLoading = ref<boolean>(false);

const emit = defineEmits(["onClose"]);

const props = defineProps<IProps>();
const { opt, userInfo, visible } = toRefs(props);

let validatePass = async (_rule: Rule, value: string) => {
    if (value === "") {
        if (opt.value === "update") return Promise.resolve();
        return Promise.reject(t("user.form.message.password"));
    } else {
        if (!validatePwd(value))
            return Promise.reject(t("user.form.message.validate.password"));
        if (userInfo.value.confirmPassword !== "") {
            modalFormRef.value?.validateFields("confirmPassword");
        }
        return Promise.resolve();
    }
};
let validatePass2 = async (_rule: Rule, value: string) => {
    if (value === "") {
        if (opt.value === "update") return Promise.resolve();
        return Promise.reject(t("user.form.message.confirmPassword"));
    } else if (value !== userInfo.value.password) {
        return Promise.reject(t("user.form.message.validate.inconsistent"));
    } else {
        return Promise.resolve();
    }
};
let validateEmailInput = async (_rule: Rule, value: string) => {
    if (value !== "") {
        if (!validateEmail(value))
            return Promise.reject(t("ser.form.message.validate.email"));
    }
    return Promise.resolve();
};

const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
        return;
    }
    if (info.file.status === "done") {
        getBase64(info.file.originFileObj, (base64Url: string) => {
            userInfo.value.headImg = base64Url;
        });
    }
    if (info.file.status === "error") {
        message.error("upload error");
    }
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error(t("user.form.upload.type", ["JPG/PNG"]));
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error(t("user.form.upload.size", [2]));
    }
    return isJpgOrPng && isLt2M;
};

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

/**
 * 保存用户
 */
const onOk = () => {
    modalFormRef.value?.validate().then((values) => {
        const games = toRaw(values.gameList);
        confirmLoading.value = true;

        const add = async () => {
            const res = await user.addManager({ ...values, gameList: games });

            if (res?.code === "0") {
                message.success(t("message.add.success"));
                onCancel();
            }
            confirmLoading.value = false;
        };

        const update = async () => {
            const res = await user.upateManager({
                ...values,
                id: userInfo.value.id,
                gameList: games,
            });
            if (res?.code === "0") {
                message.success(t("message.edit.success"));
                onCancel();
            }
            confirmLoading.value = false;
        };

        if (opt.value === "add") add();
        if (opt.value === "update") update();
    });
};

const onCancel = () => {
    emit("onClose", {});
};
</script>
<style lang="less">
.avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;

    img {
        width: 100%;
        height: 100%;
    }
}
</style>
