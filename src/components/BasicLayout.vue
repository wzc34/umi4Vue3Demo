<!--
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-08 10:02:22
-->
<template>
  <PageHeader />
  <a-layout class="page-layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <!-- <div class="logo" /> -->
      <a-menu
        v-model:selectedKeys="global.selectedKeys"
        theme="light"
        mode="inline"
        @click="handleClick"
        :style="{ width: collapsed ? '80px' : '200px' }"
      >
        <a-menu-item key="/home">
          <pie-chart-outlined />
          <span>{{ t("menu.home") }}</span>
        </a-menu-item>
        <a-menu-item key="/monitor">
          <alert-outlined />
          <span>{{ t("menu.monitor") }}</span>
        </a-menu-item>
        <a-menu-item key="/app">
          <hdd-outlined />
          <span>{{ t("menu.app") }}</span>
        </a-menu-item>
        <a-menu-item key="/server">
          <appstore-outlined />
          <span>{{ t("menu.server") }}</span>
        </a-menu-item>
        <a-menu-item key="/billingPoint">
          <money-collect-outlined />
          <span>{{ t("menu.billingPoint") }}</span>
        </a-menu-item>
        <a-menu-item key="/agent">
          <cluster-outlined />
          <span>{{ t("menu.agent") }}</span>
        </a-menu-item>
        <a-menu-item key="/service">
          <customer-service-outlined />
          <span>{{ t("menu.service") }}</span>
        </a-menu-item>
        <a-menu-item
          key="/game"
          v-if="
            !!user.currentUser && user.currentUser?.role === 'ROLE_SUPER_ADMIN'
          "
        >
          <send-outlined />
          <span>{{ t("menu.game") }}</span>
        </a-menu-item>
        <a-menu-item
          key="/user"
          v-if="
            !!user.currentUser && user.currentUser?.role === 'ROLE_SUPER_ADMIN'
          "
        >
          <user-outlined />
          <span>{{ t("menu.user") }}</span>
        </a-menu-item>
      </a-menu>
      <div class="trigger">
        <menu-unfold-outlined
          v-if="collapsed"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else @click="() => (collapsed = !collapsed)" />
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                </a-breadcrumb> -->
        <div class="right-content">
          <slot></slot>
        </div>
      </a-layout-content>
      <a-layout-footer>
        <span>
          Copyright ©2022 海南晨风科技有限公司 &nbsp;&nbsp;&nbsp;&nbsp;<a
            href="https://beian.miit.gov.cn"
            target="_blank"
            >琼ICP备 2021003599号</a
          >
        </span>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import PageHeader from "@/components/PageHeader.vue";
import { useGlobalStore } from "@/stores/global";
import {
  AlertOutlined,
  AppstoreOutlined,
  HddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SendOutlined,
  UserOutlined,
  ClusterOutlined,
  MoneyCollectOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import { useRouter } from "umi";
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import useLocale from "@/utils/useLocale";
const {
  i18n: { t },
} = useLocale();

const global = useGlobalStore();
const router = useRouter();
let collapsed = ref<boolean>(false);

const user = useUserStore();

const handleClick: MenuProps["onClick"] = (e) => {
  router.push(`${e.key}`);
};
</script>
<style lang="less">
.page-layout {
  min-height: 100vh;
  padding-top: 60px;

  .right-content {
    min-height: 360px;
    margin-top: 16px;
  }
}

.trigger {
  transition: color 0.3s;
  color: #8490a6;
  padding: 10px;
  border-right: 28px solid #f5f5f7;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  position: absolute;
  top: calc(100vh * 0.5 - 60px);
  right: 0;
  height: 64px;

  .anticon {
    cursor: pointer;
    position: absolute;
    right: -22px;
    top: 17px;
  }
}

.trigger:hover {
  color: #1890ff;
}

.ant-layout-sider {
  background: #fff !important;
}

.ant-layout-sider-children {
  background: #fff;
  padding-top: 60px;
  position: fixed;
  top: 0;
  left: 0;
}

.ant-layout-footer {
  text-align: center;
  padding: 20px;
}
</style>
