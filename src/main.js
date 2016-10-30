/**
 * main.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

Vue.use(VueRouter)

var pageRouterList = { 'home': '', 'about': '' } // 页面列表
var pageRouterOption = []         // 构造router
var optionItem

function RouterOption (path, name) {
  this.path = '/' + path
  this.name = name
  this.component = function (resolve) {
    require(['./views/' + name + '.vue'], resolve)
  }
}

for (var pageName in pageRouterList) {
  optionItem = new RouterOption(pageName, pageName)
  pageRouterOption.push(optionItem)
}

// 其他链接
pageRouterOption.push({
  path: '*', redirect: { name: 'home' }
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
