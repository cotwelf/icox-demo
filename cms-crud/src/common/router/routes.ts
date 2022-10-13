import Entry from '@/pages/entry/Entry.vue'

export default [
    // 公用页面
    {
        name: 'Entry',
        path: '/',
        load: { component: Entry },
        // load: { component: () => import('@/pages/entry/Entry.vue') }, // 支持动态加载
        status: 'nosidebar' // 不展示 sidebar, 支持数组, 数据会注入到 [cox]app.sidebar.status
    }, 
    // 功能引导
    {
        name: 'GuideCrudList',
        path: '/guide-crud-list',
        load: () => import('@/pages/guide/curd-list'), // 引入目标页面
    }, {
        name: 'GuideVuePage',
        path: '/guide-vue-page',
        load: { component: () => import("@/pages/guide/vue-page.vue" )}, // 引入 vue 页面
    }
]