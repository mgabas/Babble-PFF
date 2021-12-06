import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Router from 'vue-router'
import index from '@/components/index'
import progressive from '@/components/progressive'

Vue.use(Router)
Vue.use(Vuelidate)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      alias: '/index'
    },

    {
      path: '/progressive',
      name: 'progressive',
      component: progressive
    }

  ]
})
