<!--
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2022-08-08 10:42:36
-->
<template>
    <div class="page-header-box">
        <a-row>
            <a-col :span="12" class="left">
                <img src="../assets/yay.jpg" width="388" class="logo" />
                <a-dropdown>
                    <a class="ant-dropdown-link" v-show="game.userGameList.length > 0" @click.prevent>
                        <div class="game-down-box">
                            {{ game.currentGame?.name }}
                            <caret-down-outlined />
                        </div>
                    </a>
                    <template #overlay>
                        <a-menu @click="handleMenuClick">
                            <a-menu-item v-for="item in game.userGameList" :key="item.id">
                                {{ item.name }}
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </a-col>
            <a-col :span="12">
                <div class="right">
                    <a-input allowClear v-model:value="searchValue" :placeholder="t('search.placeholder')"
                        style="width: 200px; margin-right: 30px" @pressEnter="onSearch">
                        <template #suffix>
                            <search-outlined @click="onSearch" style="cursor: pointer;" />
                        </template>
                    </a-input>
                    <a-dropdown>
                        <div>
                            <a class="ant-dropdown-link" @click.prevent>
                                <span class="lang-txt">{{
                                LocaleLang[currentLocale]
                                }}</span>
                            </a>
                        </div>
                        <template #overlay>
                            <a-menu @click="switchLang">
                                <a-menu-item v-for="(item, key) in LocaleLang" :key="key">
                                    {{ item }}
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                    <a-dropdown>
                        <div class="avatar-box">
                            <a class="ant-dropdown-link" @click.prevent>
                                <a-avatar class="avatar" :src="
                                    user.currentUser?.headImg ||
                                    'https://joeschmoe.io/api/v1/random'
                                "></a-avatar>
                                <span class="name">{{ user.currentUser?.username }}</span>
                            </a>
                        </div>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="0">
                                    <a rel="noopener noreferrer" @click="logout">
                                        <div :style="{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }">
                                            <logout-outlined :style="{
                                                marginRight: '5px',
                                                fontSize: '12px',
                                            }" />
                                            {{ t("account.logout") }}
                                        </div>
                                    </a>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script lang="ts" setup>
import { useGameStore } from "@/stores/game";
import { useUserStore } from "@/stores/user";
import { LocaleLang } from "@/constants";
import eventBus, { EVENT_TYPE } from "@/utils/eventBus";
import useLocale from "@/utils/useLocale";
import { CaretDownOutlined, LogoutOutlined, SearchOutlined } from "@ant-design/icons-vue";
import type { MenuProps } from "ant-design-vue";
import { ref } from "vue";
import { useServerStore } from "@/stores/server";
import { useAppStore } from "@/stores/app";
const {
    i18n: { t }, // 解构实例用具t 访问语言变量
    currentLocale, //当前国际化
    changeLocale, // 修改国际化
} = useLocale();

const user = useUserStore();
const game = useGameStore();
const server = useServerStore();
const app = useAppStore();

const logout = async () => {
    const res = await user.logout();
    if (res?.code === "0") {
        eventBus.emit(EVENT_TYPE.LOGOUT, "");
    }
};

game.findGamesByManager();

/**
 * 切换游戏
 * @param e
 */
const handleMenuClick: MenuProps["onClick"] = (e) => {
    const gameId = `${e.key}`;
    game.onChangeGame(gameId);

    // 当前页面为包管理与区服管理页面时重新请求数据
    const href = window.location.href;
    if (href.includes("app")) {
        server.findListByGameId(gameId);

        app.unmountState();

        eventBus.emit(EVENT_TYPE.APP_LIST_CHANGE_BY_GAME, gameId);
    }
    if (href.includes("server")) {
        server.findList(1, 10, gameId);
    }
};

const searchValue = ref<string>("");

const onSearch = () => {
    console.log("use value", searchValue.value);
};

/**
 * 切换语言
 */
const switchLang = (e) => {
    changeLocale(e.key);
};
</script>

<style lang="less">
.page-header-box {
    height: 60px;
    line-height: 60px;
    background: #002140;
    padding: 0 10px;
    position: fixed;
    width: 100%;
    min-width: 954px;
    z-index: 9;

    .left {
        display: flex;
        align-items: center;

        .logo {
            width: 40px;
            height: 40px;
            border-radius: 5px;
            margin: 0 20px 0 10px;
        }

        .game-down-box {
            color: #fff;
            font-size: 20px;
        }
    }

    .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .avatar-box {
            margin: 0 10px 0 30px;
            text-align: center;
        }

        .avatar {
            color: #f56a00;
            background-color: #fde3cf;
            margin-bottom: 5px;
        }

        .name {
            margin-left: 10px;
            color: #fde3cf;
        }

        .lang-txt {
            color: #fff;
            border: 1px #fde3cf solid;
            width: 80px;
            display: inline-block;
            height: 30px;
            line-height: 30px;
            text-align: center;
        }

        .ant-input,
        .ant-input-search-button {
            height: 32px !important;
        }
    }
}
</style>
