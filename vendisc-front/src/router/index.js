import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/HomeView.vue'
import nProgress from 'nprogress/nprogress'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/UserView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue')
  },
  {
    path: '/retrieve',
    name: 'retrieve',
    component: () => import('@/views/retrieve/RetrieveView.vue')
  },
  {
    path: '/pwd',
    name: 'password',
    component: () => import('@/views/password/EditPwdView.vue')
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (from.name !== null) {
    nProgress.start()
  }

  const toViewName = to.name
  const token = router.app.$options.store.state.user.token

  if (token === '' && (toViewName === 'home' || toViewName === 'user' || toViewName === 'password')) {
    next('/login')
    nProgress.done()
  }
  else if (token !== '' && (toViewName === 'login' || toViewName === 'register' || toViewName === 'retrieve')) {
    next('/')
    nProgress.done()
  }
  else {
    next()
  }
})

router.afterEach(() => {
  nProgress.done()
})

export default router
