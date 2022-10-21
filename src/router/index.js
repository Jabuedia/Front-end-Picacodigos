import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/inicioSesion',
      name: 'inicioSesion',
      component: () => import('../views/inicioSesionView.vue')
    },
    {
      path: '/activo',
      name: 'activo',
      component: () => import('../views/activoView.vue')
    },
    {
      path: '/personas',
      name: 'personas',
      component: () => import('../views/personasView.vue')
    },
    {
      path: '/apartamento',
      name: 'apartamento',
      component: () => import('../views/apartamentoView.vue')
    },
    {
      path: '/facturas',
      name: 'facturas',
      component: () => import('../views/facturasView.vue')
    }
  ]
})

export default router

