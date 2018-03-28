import Vue from 'vue'
import Router from 'vue-router'
/* import HelloWorld from '@/components/HelloWorld' */
import HomePage from '@/app/index'
import LoginPwd from '@/app/inputPwd'
import MsgLogin from '@/app/msgLogin'
import Demo from '@/app/demo/demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/demo',
      name: 'Demo',
      component: Demo
    },
    {
      path:'/loginPwd',
      name: 'LoginPwd',
      component: LoginPwd
    },
    {
      path:'/msgLogin',
      name: 'MsgLogin',
      component: MsgLogin
    }
  ]
})
