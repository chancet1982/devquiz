import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Thanks from '@/components/Thanks'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/thanks',
      name: 'Thanks',
      component: Thanks
    },    
    {
      path: '/results',
      name: 'Results',
      component: Results
    },
    { path: '*', redirect: '/' }  
  ]
})
