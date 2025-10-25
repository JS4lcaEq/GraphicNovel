<script setup>

import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const goBack = () => {
  // console.log('goBack ' + new Date().toISOString())
  router.go(-1)
}
const goHome = () => {
  // console.log('goHome ' + new Date().toISOString())
  router.push('/')
}
</script>

<template>
  <el-container>
    <el-header>
      <div id="h-b">
        <el-icon ><Back @click="goBack" /></el-icon>
        <img alt="logo" class="logo-icon" src="@/assets/logo.png" @click="goHome" />
        <span>{{ route.meta.title || 'Graphic Novel' }}</span>
      </div>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<style>
header {
  position: relative;
  z-index: 111;
}

.logo-icon-wrapper {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  margin: 0 10px;
}

header ul {
  list-style: none;
  padding: 0;
}

.el-page-header__left .el-divider--vertical {
  display: none;
}

#h-b {
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10px;
  font-size: 28px;
}
#h-b i {
  cursor: pointer;
}
</style>
