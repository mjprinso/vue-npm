import Vue from 'vue'
import Router from 'vue-router'
import Npmchart from '@/components/npm-chart/welcome'
import Npmchart2 from '@/components/npm-chart-2/welcome.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Npmchart',
      component: Npmchart
    },
    {
      path: '/detailed',
      name: 'detailed',
      component: Npmchart2
    }
  ]
})
