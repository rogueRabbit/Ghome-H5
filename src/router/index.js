import Vue from 'vue'
import Router from 'vue-router'
/* import HelloWorld from '@/components/HelloWorld' */
import HomePage from '@/app/index'
import Demo from '@/app/demo/demo'
import ForgetPasswordOne from '@/app/forget-password/forget-password-one';
import ForgetPasswordSecond from '@/app/forget-password/forget-password-second';
import ForgetPasswordThird from '@/app/forget-password/forget-password-third';

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
      path: '/forgetPasswordOne',
      name: 'forgetPasswordOne',
      component: ForgetPasswordOne
    },
    {
      path: '/forgetPasswordSecond',
      name: 'forgetPasswordSecond',
      component: ForgetPasswordSecond
    },
    {
      path: '/forgetPasswordThird',
      name: 'forgetPasswordThird',
      component: ForgetPasswordThird
    }
  ]
})
