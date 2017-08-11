import Vue from 'vue'
import Router from 'vue-router'
import Npmchart from '@/components/npm-chart/welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Npmchart',
      component: Npmchart
    }
  ]
})
