import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '@/views/MainView.vue'
import MinistrosComponent from '@/components/MinistrosComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '/main/ministers',
          name: 'Ministros',
          component: MinistrosComponent
        }
      ]
    }
  ]
})

export default router
