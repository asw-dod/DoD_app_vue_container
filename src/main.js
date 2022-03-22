import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Home from './views/HomeView.vue'
import about from './views/AboutView.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: about
    }
  ]
})
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
