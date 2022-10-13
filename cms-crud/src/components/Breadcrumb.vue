<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item class="to-home" @click="toHome" key="material-home">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in state.breadcrumbList" :key="item.path">
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { reactive, onMounted, unref, computed, watch } from 'vue'
import { useState, COX_MODLE_APP } from 'icox'
import { useRoute, useRouter } from 'vue-router'
const { sidebar: sidebarRef } =  useState(COX_MODLE_APP, ['sidebar'])
const state = reactive({ 
  breadcrumbList: [] as any[]
})
const route = useRoute()
const router = useRouter()

const getBreadcrumb =  () => {
  const sidebar = unref(sidebarRef)
      const matched = route.matched
        .map(item => ({
          ...item,
          meta: {
            ...item.meta,
            title: sidebar.meta[item.name!] && sidebar.meta[item.name!].title
          },
        }))
        .filter(
          (item) => item.meta && item.meta.title
        )
      state.breadcrumbList = matched
  }

const toHome = () => {
    router.push({ name: 'Entry' })
}

watch(() => route.fullPath, () => {
  getBreadcrumb()
})

const breadcrumbClick =  (breadcrumb: any) =>  {
      const { name } = breadcrumb
      if (name !== router.currentRoute.value.name) {
        router.push({
          name: breadcrumb.name
        })
      }
    }


onMounted(() => {
  getBreadcrumb()
})

</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-left: 10px;
}
.to-home {
  cursor: pointer;
}
</style>
