
import 'element-plus/dist/index.css'
import 'icox/dist/index.css'
import { store } from '@/common/store'
import { registCoxComponents, registCoxApp } from 'icox'

registCoxApp(store)
registCoxComponents({ 
    Header: () => import('@/components/Header.vue')
})

// @ts-ignore
window.$store = store