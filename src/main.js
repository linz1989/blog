/**
 * main.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

Vue.use(VueRouter)

var pageRouterList = ['css', 'about', 'learning-css-secrects-1', 'learning-css-secrects-2']  // 页面列表
var pageRouterOption = []         // 构造router

function RouterOption (name) {
  this.path = '/' + name.replace(/-/g, '/')
  this.name = name
  this.component = function (resolve) {
    require(['./views/' + name.replace(/-/g, '/') + '.vue'], resolve)
  }
}

pageRouterList.forEach(function (pageName) {
  pageRouterOption.push(new RouterOption(pageName))
})

// 其他链接
pageRouterOption.push({
  path: '*', redirect: { name: 'css' }
})

// 路由配置
var router = new VueRouter({
  linkActiveClass: 'active',
  routes: pageRouterOption
})

console.dir(router)

// 加载页面之前
router.beforeEach(function (to, from, next) {
  next()
})

new Vue({router, render: h => h(App)}).$mount('#app')
