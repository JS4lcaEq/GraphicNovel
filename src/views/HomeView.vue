<script setup>
import { ref } from 'vue'

import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeNames = ref([])
const handleChange = (val) => {
  activeNames.value = val
}
</script>

<template>

  <el-collapse v-model="activeNames" @change="handleChange">

    <template v-for="(route, index) in router.getRoutes()" :key="route.meta.source">
      <el-collapse-item :title="route.meta.title" :name="index" v-if="route.path !== '/'">
        <template #title="{ isActive }">
          <RouterLink :to="route.path">{{ $t('message.menu.' + route.name ) }}</RouterLink>
        </template>
        <p>{{ route.meta.note }}</p>
      </el-collapse-item>
    </template>

  </el-collapse>

</template>

<style>
.el-collapse-item__title a {
  font-weight: bold;
  font-size: 18px;
  display: block-inline;
  background-color: #fffffff0;
  padding: 3px;
}

.el-collapse-item__title a:hover {
  background-color: #cccccc55;
}
</style>
