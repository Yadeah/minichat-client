import routes from './routes.js'
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({ routes })

router.beforeEach(async (to, from, next) => {
  // TODO check log
  let isLogin = false
  if (isLogin) {
    // 已登录
    if (to.path === '/login') {
      // 转到首页
      next('/')
    } else {
      next({ ...to, replace: true })
    }
  } else {
    // 未登录
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
