import './register'
// 需要确保 register 在 sidebar 之前被引入
import App from "./App.vue";
import { router, sidebar } from '@/common/router'
import { createCoxApp } from 'icox';

// 初始化
init();

async function init() {
    createCoxApp(App, { router, sidebar })
        .mount("#app")
}