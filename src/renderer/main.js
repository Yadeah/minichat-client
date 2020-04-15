import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
// 路由
import router from './router'
// style
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css
// icon
import '@/icons'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
