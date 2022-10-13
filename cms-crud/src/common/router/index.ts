import { createRouter, createWebHistory } from 'vue-router';
import { defineSidebarRouter } from 'icox'
import routes from './routes'

export const sidebar = defineSidebarRouter({
    routes,
    title: '欢迎使用 cox ~',
    sidebar: [
      { title: '功能引导', icon: 'el-icon-magic-stick' },
      { title: '功能引导|CrudList', route: 'GuideCrudList' },
      { title: '功能引导|VuePage', route: 'GuideVuePage' },
    ],
})

export const router = createRouter({
    history: createWebHistory(),
    routes: sidebar.routes,
})
