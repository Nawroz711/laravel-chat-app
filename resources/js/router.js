import { createRouter, createWebHistory, useRouter } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../js/views/auth/Login.vue'),
      meta: {
        requireAuth: false
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../js/views/auth/Signup.vue'),
      meta: {
        requireAuth: false
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      meta: {
        requireAuth: false
      },
      component: () => import('../js/utils/404.vue'),
    },

  ]
})


router.beforeEach((to, from, next) => {
  
  if(to.meta.requireAuth && !localStorage.getItem('auth_token')) router.back()
  if(!to.meta.requireAuth && localStorage.getItem('auth_token')) router.back()
  next()

})


export default router
