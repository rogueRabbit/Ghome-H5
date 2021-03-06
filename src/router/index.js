import Vue from 'vue'
import Router from 'vue-router'
/* import HelloWorld from '@/components/HelloWorld' */
import HomePage from '@/app/index'
import MsgLogin from '@/app/msgLogin'
import Demo from '@/app/demo/demo'
import ForgetPasswordOne from '@/app/forget-password/forget-password-one';
import ForgetPasswordSecond from '@/app/forget-password/forget-password-second';
import ForgetPasswordThird from '@/app/forget-password/forget-password-third';
import PwdLogin from '@/app/pwdLogin/pwdLogin';
import VisitorUpgrade from '@/app/visitor-upgrade/visitor-upgrade';
import SmallId from '@/app/small-id/small-id'
import RealName from '@/app/realName/realName'
import LoginList from '@/app/login-list/login-list';
import ActiveUser from '@/app/active-user/active-user'
import NoRegister from '@/app/noRegister/noRegister';
import JudgePayUrl  from '@/app/judge-pay-url/judge-pay-url';
import PayVisitorEntry  from '@/app/pay-visitor-entry/pay-visitor-entry';
import Game from '@/app/game/game';
import ThirdLoginMiddle from '@/app/third-login-middle/third-login-middle';


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
    },
    {
      path:'/pwdLogin',
      name: 'pwdLogin',
      component: PwdLogin
    },
    {
      path:'/msgLogin',
      name: 'msgLogin',
      component: MsgLogin
    },
    {
      path: '/visitorUpgrade',
      name: 'visitorUpgrade',
      component: VisitorUpgrade
    },
    {
      path:'/smallId',
      name: 'smallId',
      component: SmallId
    },
    {
      path:'/realName',
      name: 'realName',
      component: RealName
    },
    {
      path:'/activeuser',
      name: 'activeuser',
      component: ActiveUser
    },
    {
      path:'/loginList',
      name: 'loginList',
      component: LoginList
    },
    {
      path:'/noRegister',
      name: 'noRegister',
      component: NoRegister
    },
    {
      path:'/judgePayUrl',
      name: 'judgePayUrl',
      component: JudgePayUrl
    },
    {
      path: '/payVisitorEntry',
      name: 'payVisitorEntry',
      component: PayVisitorEntry
    },
    {
      path:'/game',
      name: 'game',
      component: Game
    },
    {
      path:'/thirdLoginMiddle',
      name: 'thirdLoginMiddle',
      component: ThirdLoginMiddle
    }
  ]
})
