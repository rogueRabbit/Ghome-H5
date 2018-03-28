<template>
  <div class="index_wrap">
    <div class="index_main">
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
            <label class="country">+86
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
  </div>
</template>

<script>
    import { getPostData } from '@/api/ghhttp.js'
    import { APIs } from '@/api/requestUrl'
    /* eslint-disable */
    export default {
        name: "PwdLogin",
        data() {
            return {
              phone: '',
              loginPassword: ''
            };
        },
        created: function () { },
        ready() {
        },
        mounted: function () {
        },
        methods: {

          gotoLogin(){

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
          gotoForgetPassword(){

            this.$router.push({name: 'forgetPasswordOne', query:{phone: this.phone}});

          },

          switchPhoneLogin(){

            this.$router.push({ name: 'msgLogin', params: { } })

          },

          goBack(){

          }

        }
    };
</script>
