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
        // 首页
        name: 'home',
        path: '/',
        component: () => import('@/views/home')
      },
      {
        // 我的
        name: 'mine',
        path: '/mine',
        component: () => import('@/views/mine')
      },
      {
        name: 'search',
        path: '/search',
        // 搜索界面
        component: () => import('@/views/search')
      },
      {
        // 搜索结果页面
        name: 'search-results',
        path: '/search-results/:content',
        component: () => import('@/views/search/search-results.vue')
      }
      ]
    },
    {
      // 详情页
      name: 'articles',
      path: '/articles/:articles_id',
      component: () => import('@/views/articles')
    },
    {
      // 编辑页
      name: 'user-profile',
      path: '/user-profile',
      component: () => import('@/views/mine/component/user-profile.vue')
    },
    {
      // 聊天界面
      name: 'feedback',
      path: '/feedback',
      component: () => import('@/views/chart')
    }
  ]
})
