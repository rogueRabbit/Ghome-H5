<template>
  <div class="index_wrap">
    <div class="index_main" v-if='!showArea'>
      <div class="header_bar">
        <a class="back">
          <i class="icon_back" @click="goBack"></i>
        </a>
        <a class="close">
          <i class="icon_close"></i>
        </a>
      </div>
      <div class="pwdLogin">
        <div class="login_form">
          <h3>账号登录</h3>
          <div class="item">
            <label class="country" @click="changeArea">{{areaCode}}
              <span class="down"></span>
            </label>
            <input type="text" placeholder="请输入手机号码" class="phone" v-model="phone" autocomplete="off">
          </div>
          <div class="item">
            <input type="password" placeholder="请输入登录密码" class="password-input" v-model="loginPassword">
            <i class="lock-icon"></i>
            <span class="get_yzm forget-password" @click="gotoForgetPassword()">忘记密码</span>
          </div>
          <div class="btns">
            <a class="btn" @click="gotoLogin()">进入游戏</a>
          </div>
          <div class="bottom_box">
            <a class="link" @click="switchPhoneLogin()">短信登录</a>
          </div>
        </div>
      </div>
    </div>

    <div class="index_main area_code" v-if="showArea">
      <div class="header_bar">
        <a class="close">
          <i class="icon_close" @click="closeAreaSelect"></i>
        </a>
      </div>
      <div class="title">手机归属地</div>
      <div class="content">
        <div class="showList" v-for="(word,key) in wordList" :key="key">
          <div class="listWord" v-if="getCountryList(word)">
            <h3 class="conuntryTitle">{{word}}</h3>
            <ul class="country-wrap">
              <li v-for="(item,key) in countryList" :key="key" @click="onSelect(item.flag,item.text)" class="showCountryList" v-if="item.word==word">
                {{item.text}}
                <span>{{item.flag}}</span>
                <i class="icon_check_on"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getPostData } from '@/api/ghhttp.js'
  import { APIs } from '@/api/requestUrl'
  import { country } from '../msgLogin/country.js'
  /* eslint-disable */
  export default {
    name: "PwdLogin",
    data() {
      return {
        phone: '',
        loginPassword: '',
        countryList: country(),
        wordList: [
          '常用', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
          'H', 'I', 'J', 'K', 'L', 'M', 'N',
          'O', 'P', 'Q', 'R', 'S', 'T', 'U',
          'V', 'W', 'X', 'Y', 'Z'
        ],
        areaCode: '+86',
        showArea: 0,
        hasInput: 0,//进入游戏按钮是否disable
      };
    },
    created: function () { },
    ready() {
    },
    mounted: function () {
    },
    methods: {

      gotoLogin() {

        let params = {
          ua: '1.1',
          phone: this.phone,
          password: this.loginPassword,
          deviceid: 1,
          group: 1,
          supportPic: 2
        };

        getPostData(APIs.getLoginUrl(), params, (res) => {

        })
      },

      //点击忘记密码
      gotoForgetPassword() {

        this.$router.push({ name: 'forgetPasswordOne', query: { phone: this.phone } });

      },

      switchPhoneLogin() {

        window.history.go(-1);

      },

      goBack() {
        window.history.go(-1);
      },

      changeArea() {
        this.showArea = 1;
      },
      getCountryList(word) {
        let selectList = this.countryList.filter(item => item.word === word)
        if (selectList.length > 0) {
          return 1
        } else {
          return 0
        }
      },
      onSelect(flag, text) {
        this.areaCode = flag;
        this.showArea = 0;
      },
      closeAreaSelect() {
        this.showArea = 0;
      },
    }
  };
</script>