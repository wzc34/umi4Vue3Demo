<!--
 * @Description: 游戏管理
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
            :placeholder="t('game.query.placeholder')"
            style="width: 300px"
            enter-button
            @search="onFinish"
          />
        </a-form-item>
        <a-button type="primary" @click="handleToAdd" style="margin-left: 30px">
          <template #icon>
            <PlusOutlined />
          </template>
          {{ t("game.button.add") }}
        </a-button>
      </a-form>
    </a-card>
  </QueryContainer>
  <a-card style="margin-top: 10px">
    <a-table
      :dataSource="game.gameList"
      :columns="columns"
      :pagination="pagination"
      :loading="game.loading"
      :scroll="{ x: 1200 }"
      size="small"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'operation'">
          <a-space>
            <a @click="handleToEdit(record)">{{ t("button.edit") }}</a>
            <a @click="handleDel(record)">{{ t("button.delete") }}</a>
          </a-space>
        </template>
      </template>
    </a-table>
  </a-card>
  <template>
    <a-modal
      v-model:visible="visible"
      :maskClosable="false"
      :confirmLoading="confirmLoading"
      :destroyOnClose="true"
      :width="800"
      :title="opt === 'add' ? t('game.button.add') : t('game.button.edit')"
      @ok="onOk"
    >
      <a-form
        ref="modalFormRef"
        name="myGameForm"
        :model="currentGame"
        v-bind="layout"
      >
        <a-form-item
          name="name"
          :label="t('game.column.name')"
          :rules="[{ required: true, message: t('game.form.message.name') }]"
        >
          <a-input
            v-model:value="currentGame.name"
            :maxlength="20"
            :placeholder="t('game.form.message.name')"
          />
        </a-form-item>
        <a-form-item
          name="number"
          :label="t('game.column.number')"
          :rules="[{ required: true, message: t('game.form.message.number') }]"
        >
          <a-input
            v-model:value="currentGame.number"
            :maxlength="20"
            :placeholder="t('game.form.message.number')"
          />
        </a-form-item>
        <a-form-item name="keyWord" :label="t('game.column.keyWord')">
          <a-input
            v-model:value="currentGame.keyWord"
            :maxlength="50"
            :placeholder="t('game.form.message.keyWord')"
          />
        </a-form-item>
        <a-form-item
          name="type"
          :label="t('game.column.type')"
          :rules="[{ required: true, message: t('game.form.message.type') }]"
        >
          <a-select
            v-model:value="currentGame.type"
            :placeholder="t('game.form.message.type')"
            :options="game.gameTypeList"
          >
          </a-select>
        </a-form-item>
        <a-form-item
          name="state"
          :label="t('game.column.state')"
          :rules="[{ required: true, message: t('game.form.message.state') }]"
        >
          <a-select
            v-model:value="currentGame.state"
            :placeholder="t('game.form.message.state')"
            :options="game.gameStateList"
          >
          </a-select>
        </a-form-item>
        <a-form-item name="info" :label="t('game.column.info')">
          <a-textarea
            v-model:value="currentGame.info"
            show-count
            :maxlength="200"
            :placeholder="t('game.form.message.info')"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </template>
</template>
<script lang="ts" setup>
import { useGameStore } from "@/stores/game";
import { showConfirm } from "@/utils/showConfirm";
import { FormInstance, message, notification } from "ant-design-vue";
import { computed, reactive, ref, watch, onBeforeUnmount } from "vue";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons-vue";
import { useUserStore } from "@/stores/user";
import QueryContainer from "@/components/QueryContainer.vue";
import type { UnwrapRef } from "vue";
import useLocale from "@/utils/useLocale";
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
const modalFormRef = ref<FormInstance>();
const opt = ref<string>("add");
const confirmLoading = ref<boolean>(false);
const visible = ref<boolean>(false);
const currentGame = reactive({
  id: undefined,
  name: "",
  keyWord: "",
  number: "",
  type: undefined,
  state: undefined,
  info: "",
});

const onFinish = () => {
  game.queryGameListPage(formState.queryValue);
};

const row = 10;
/**
 * 游戏列表
 */
const findGameListPage = async (page: number, row: number) => {
  await game.findGameListPage(page, row);
};

/**
 * 验证权限
 */
const checkAuth = async () => {
  const flag = await isAdmin();
  if (!flag) findGameListPage(game.page, row);
};
checkAuth();

game.findDictByCode(Dictionary.type);
game.findDictByCode(Dictionary.state);

/**
 * 去添加游戏
 */
const handleToAdd = () => {
  visible.value = true;
  opt.value = "add";
};

/**
 * 去编辑游戏
 * @param record
 */
const handleToEdit = async (record) => {
  const data = await game.findGameById(record.id);
  if (data) {
    currentGame.id = data.id;
    currentGame.name = data.name;
    currentGame.keyWord = data.keyWord;
    currentGame.number = data.number;
    currentGame.type = data.type;
    currentGame.state = data.state;
    currentGame.info = data.info;
    visible.value = true;
    opt.value = "update";
  }
};

/**
 * 保存游戏
 */
const onOk = () => {
  modalFormRef.value?.validate().then((values) => {
    confirmLoading.value = true;

    const add = async () => {
      const res = await game.addGame(values);

      if (res?.code === "0") {
        message.success(t("message.add.success"));
        visible.value = false;
      }
      confirmLoading.value = false;
    };

    const update = async () => {
      const res = await game.upateGame({ ...values, id: currentGame.id });
      if (res?.code === "0") {
        message.success(t("message.edit.success"));
        visible.value = false;
      }
      confirmLoading.value = false;
    };

    if (opt.value === "add") add();
    if (opt.value === "update") update();
  });
};

/**
 * 删除游戏
 */
const handleDel = (record) => {
  const del = async () => {
    const res = await game.deleteGameById(record.id);
    if (res) message.success(t("message.delete.success"));
  };
  showConfirm(
    t("modal.confirm.title"),
    t("modal.confirm.delete", [record.name]),
    () => {
      del();
    }
  );
};

watch(
  visible,
  (newValue, oldValue) => {
    if (!newValue) {
      currentGame.id = undefined;
      currentGame.name = "";
      currentGame.keyWord = "";
      currentGame.number = "";
      currentGame.type = undefined;
      currentGame.state = undefined;
      currentGame.info = "";
    }
  },
  { flush: "post" }
);

onBeforeUnmount(() => {
  game.unmountState();
});

const pagination = computed(() => ({
  total: game.total,
  current: game.page,
  pageSize: row,
  onChange: findGameListPage,
  showTotal: (total) => t("title.total", [total]),
}));

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const columns = computed(() => [
  {
    title: t("game.column.name"),
    dataIndex: "name",
    key: "name",
    fixed: true,
  },
  {
    title: t("game.column.number"),
    dataIndex: "number",
    key: "number",
    fixed: true,
  },
  {
    title: t("game.column.keyWord"),
    dataIndex: "keyWord",
    key: "keyWord",
  },
  {
    title: t("game.column.type"),
    dataIndex: "typeValue",
    key: "typeValue",
  },
  {
    title: t("game.column.state"),
    dataIndex: "stateValue",
    key: "stateValue",
  },
  {
    title: t("game.column.info"),
    dataIndex: "info",
    ellipsis: true,
    width: 400,
    key: "info",
  },
  {
    title: t("game.column.createTime"),
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: t("game.column.operation"),
    dataIndex: "operation",
    key: "operation",
    fixed: "right",
    width: 100,
  },
]);
</script>
