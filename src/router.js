import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/home'
// import Login from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [
    // 路由懒加载，用哪个加载哪个
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      path: '/',
      component: () => import('@/views/tabbar-layout'),
      children: [{
        name: 'home',
        path: '/',
        component: () => import('@/views/home')
      }]
    }
  ]
})
