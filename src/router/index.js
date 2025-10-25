import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditorView from '../views/EditorView.vue'
import FilesView from '../views/FilesView.vue'
import ViewerView from '../views/ViewerView.vue'
import AboutView from '../views/AboutView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL) , //createWebHistory(import.meta.env.BASE_URL),
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
      component: AboutView,
      meta: {
        title: 'Инструкции',
        note: 'Страница с инструкциями'
      }
    },
    {
      path: '/editor',
      name: 'editor',
      component: EditorView,
      meta: {
        title: 'Редактор',
        note: 'Страница редактора'
      }
    },
    {
      path: '/files',
      name: 'files',
      component: FilesView,
      meta: {
        title: 'Файлы',
        note: 'Страница с файлами'
      }
    },
    {
      path: '/viewer',
      name: 'viewer',
      component: ViewerView,
      meta: {
        title: 'Просмотр',
        note: 'Страница просмотра'
      }
    }
  ]
})

export default router