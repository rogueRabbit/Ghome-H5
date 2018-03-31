<template>
  <div class="index_wrap" v-if="showApp">
    <div class="index_main">
      <div class="header_bar">
        <a class="back" @click="backPage">
          <i class="icon_back"></i>
        </a>
        <a class="close">
          <i class="icon_close" @click="closeAlert"></i>
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
    <Close @closeClick="closeLogin" v-if="showCloseStatus" @closeBtn="closeBtn"></Close>

  </div>
</template>

<script>
  import Close from '@/components/close/close';
  import { getLocalStorage, setLocalStorage, isPoneAvailable } from '../../utils/Tools';
  export default {
        name: "forget-password-third",
        data(){
          return {
            phone: '',
            loginPassword: '',
            areaCode: '',
            hasInput: 0,//进入游戏按钮是否disable
            showApp:1,
            showCloseStatus:0,
          }
        },
        components: {
          Close
        },
        mounted: function(){

          if(getLocalStorage('phone')!=null){
            this.phone = getLocalStorage('phone');
          }

          if(getLocalStorage('areaCode')!=null){
            this.areaCode = getLocalStorage('areaCode');
          }

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

            this.$router.go(-1);

          },
          closeLogin(){
            this.showApp = 0;
            this.showCloseStatus = 0;
          },
          closeAlert(){
            this.showCloseStatus = 1;
          },
          closeBtn(){
            this.showCloseStatus = 0;
          }
        }
    }
</script>

<style scoped>

</style>
