<template>
  <TreeRender v-if="state.inited" :tree="renderTree" />
  <DialogLayer />
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { TreeRender, DialogLayer, useSidebarTree } from "icox";

const renderTree = useSidebarTree()
const state =  reactive({ inited: false })

onMounted(async () => {
  await Promise.all([
    // vuex actions initial
  ])
  state.inited = true
})

</script>
