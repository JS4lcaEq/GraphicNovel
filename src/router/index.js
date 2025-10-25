import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Корневая страница',
        note: 'Главная страница приложения'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Инструкции',
        note: 'Страница с инструкциями'
      }
    },
    {
      path: '/editor',
      name: 'editor',
      component: () => import('../views/EditorView.vue'),
      meta: {
        title: 'Редактор',
        note: 'Страница редактора'
      }
    },
    {
      path: '/files',
      name: 'files',
      component: () => import('../views/FilesView.vue'),
      meta: {
        title: 'Файлы',
        note: 'Страница с файлами'
      }
    },
    {
      path: '/viewer',
      name: 'viewer',
      component: () => import('../views/ViewerView.vue'),
      meta: {
        title: 'Просмотр',
        note: 'Страница просмотра'
      }
    }
  ]
})

export default router