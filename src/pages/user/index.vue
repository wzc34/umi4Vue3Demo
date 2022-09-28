<!--
 * @Description: 用户管理
 * @Author: wangzhicheng
 * @Date: 2022-08-08 16:50:39
-->
<template>
  <QueryContainer>
    <a-card v-if="user.currentUser?.role === 'ROLE_SUPER_ADMIN'">
      <a-form layout="inline" :model="formState">
        <a-form-item name="queryValue">
          <a-input-search
            allowClear
            v-model:value="formState.queryValue"
            :placeholder="t('user.query.placeholder')"
            style="width: 300px"
            enter-button
            @search="onFinish"
          />
        </a-form-item>
        <a-button type="primary" @click="handleToAdd" style="margin-left: 30px">
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t("user.button.add") }}
        </a-button>
      </a-form>
    </a-card>
  </QueryContainer>
  <a-card style="margin-top: 10px">
    <a-table
      :dataSource="user.userList"
      :columns="columns"
      :pagination="pagination"
      :loading="user.loading"
      :scroll="{ x: 1200 }"
      size="small"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'operation' && user.currentUser">
          <a-space>
            <a
              @click="handleToEdit(record)"
              v-if="
                record.username !== 'superadmin' ||
                user.currentUser.username === 'superadmin'
              "
              >{{ t("button.edit") }}</a
            >
            <a
              @click="handleDel(record)"
              v-if="
                record.username !== user.currentUser.username &&
                record.username !== 'superadmin'
              "
              >{{ t("button.delete") }}</a
            >
          </a-space>
        </template>
        <template v-else-if="column.dataIndex === 'roleValue'">
          <span>
            <a-tag :color="'green'">
              {{ text }}
            </a-tag>
          </span>
        </template>
      </template>
    </a-table>
  </a-card>
  <CreateFormVue
    :opt="opt"
    :visible="visible"
    :userInfo="userInfo"
    @onClose="onClose"
  />
</template>
<script lang="ts" setup>
import { useGameStore } from "@/stores/game";
import { useUserStore } from "@/stores/user";
import { showConfirm } from "@/utils/showConfirm";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { message, notification } from "ant-design-vue";
import { computed, onBeforeUnmount, reactive, ref, watch } from "vue";
import CreateFormVue from "./components/CreateForm.vue";
import QueryContainer from "@/components/QueryContainer.vue";
import type { UnwrapRef } from "vue";
import useLocale from "@/utils/useLocale";
import { title } from "process";
import { isAdmin } from "@/utils/auth";
import { Dictionary } from "@/constants";
const {
  i18n: { t },
} = useLocale();

interface FormState {
  queryValue: string;
}

const formState: UnwrapRef<FormState> = reactive({
  queryValue: "",
});

const game = useGameStore();
const user = useUserStore();
const opt = ref<string>("add");
const visible = ref<boolean>(false);
const userInfo = reactive({
  id: undefined,
  username: "",
  password: "",
  confirmPassword: "",
  realName: "",
  sex: undefined,
  telephone: "",
  email: "",
  role: undefined,
  remark: "",
  headImg: "",
  gameList: undefined,
});

const onFinish = () => {
  user.queryManagerListPage(formState.queryValue);
};

const row = 10;
/**
 * 用户列表
 */
const findManagerListPage = async (page: number, row: number) => {
  await user.findManagerListPage(page, row);
};

/**
 * 验证权限
 */
const checkAuth = async () => {
  const flag = await isAdmin();
  if (!flag) findManagerListPage(user.page, row);
};
checkAuth();

user.findDictByCode(Dictionary.sex);
user.findDictByCode(Dictionary.role);
game.findGameList();

/**
 * 去添加用户
 */
const handleToAdd = () => {
  visible.value = true;
  opt.value = "add";
};

/**
 * 去编辑用户
 * @param record
 */
const handleToEdit = async (record) => {
  const data = await user.findManagerById(record.id);

  if (data) {
    userInfo.id = data.id;
    userInfo.username = data.username;
    userInfo.realName = data.realName;
    userInfo.sex = data.sex;
    userInfo.telephone = data.telephone;
    userInfo.email = data.email;
    userInfo.role = data.role;
    userInfo.remark = data.remark;
    userInfo.headImg = data.headImg;
    userInfo.gameList = data.gameList || undefined;

    visible.value = true;
    opt.value = "update";
  }
};

/**
 * 删除用户
 */
const handleDel = (record) => {
  const del = async () => {
    const res = await user.deleteManagerById(record.id);
    if (res) message.success(t("message.delete.success"));
  };
  showConfirm(
    t("modal.confirm.title"),
    t("modal.confirm.delete", [record.username]),
    () => {
      del();
    }
  );
};

const onClose = () => {
  visible.value = false;
};

watch(
  visible,
  (newValue, oldValue) => {
    if (!newValue) {
      userInfo.id = undefined;
      userInfo.username = "";
      userInfo.password = "";
      userInfo.confirmPassword = "";
      userInfo.realName = "";
      userInfo.sex = undefined;
      userInfo.telephone = "";
      userInfo.email = "";
      userInfo.role = undefined;
      userInfo.remark = "";
      userInfo.headImg = "";
      userInfo.gameList = undefined;
    }
  },
  { flush: "post" }
);

onBeforeUnmount(() => {
  user.unmountState();
});

const pagination = computed(() => ({
  total: user.total,
  current: user.page,
  pageSize: row,
  onChange: findManagerListPage,
  showTotal: (total) => t("title.total", [total]),
}));

const columns = computed(() => [
  {
    title: t("user.column.username"),
    dataIndex: "username",
    key: "username",
    fixed: true,
  },
  {
    title: t("user.column.realName"),
    dataIndex: "realName",
    key: "realName",
    fixed: true,
  },
  {
    title: t("user.column.sex"),
    dataIndex: "sexValue",
    key: "sexValue",
  },
  {
    title: t("user.column.telephone"),
    dataIndex: "telephone",
    key: "telephone",
  },
  {
    title: t("user.column.email"),
    dataIndex: "email",
    key: "email",
  },
  {
    title: t("user.column.role"),
    dataIndex: "roleValue",
    key: "roleValue",
  },
  {
    title: t("user.column.gameList"),
    dataIndex: "gameList",
    key: "gameList",
    ellipsis: true,
    width: 400,
    customRender: (record) => {
      return record.value?.join(",");
    },
  },
  {
    title: t("user.column.createTime"),
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: t("user.column.operation"),
    dataIndex: "operation",
    key: "operation",
    fixed: "right",
    width: 100,
  },
]);
</script>
