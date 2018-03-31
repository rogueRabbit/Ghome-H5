<template>
  <div class="index_wrap">
    <div class="index_main">
      <div class="header_bar">
        <a class="back" @click="backPage">
          <i class="icon_back"></i>
        </a>
        <a class="close">
          <i class="icon_close"></i>
        </a>
      </div>

      <div class="pwdLogin">
        <div class="login_form">
          <h3>重置密码</h3>
          <div class="item not-edit">
            <label class="country">{{areaCode}}
              <span class="down"></span>
            </label>
            <input type="text" placeholder="请输入手机号码" class="phone" v-model="phone" autocomplete="off" disabled="">
          </div>
          <div class="item">
            <input type="password" placeholder="请输入登录密码" class="password-input" v-model="loginPassword">
            <i class="lock-icon"></i>
          </div>
          <div class="btns next-action">
            <a class="btn" @click="gotoLogin()" :class="hasInput?'':'disabledClick'">进入游戏</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "forget-password-third",
        data(){
          return {
            phone: '',
            loginPassword: '',
            areaCode: '',
            hasInput: 0,//进入游戏按钮是否disable
          }
        },
        mounted: function(){

          this.phone = this.$route.query.phone;
          this.areaCode = this.$route.query.areaCode;

        },
        watch: {

          loginPassword(newV, oldV) {
            if (newV != '' && this.loginPassword != '') {
              this.hasInput = 1;
            } else {
              this.hasInput = 0;
            }
          }

        },
        methods: {

          gotoLogin(){


          },

          backPage(){

            this.$router.push({name: 'forgetPasswordSecond', query:{phone: this.phone, areaCode: this.areaCode}});

          }


        }
    }
</script>

<style scoped>

</style>
