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
          <div class="item reset-phone">
            <label class="country" @click="changeArea">{{areaCode}}
              <span class="down"></span>
            </label>
            <input type="text" placeholder="请输入手机号码" class="phone" v-model="phone" autocomplete="off">
          </div>
          <div class="btns next-action">
            <a class="btn" @click="targetSecond()" :class="hasInput?'':'disabledClick'">下一步</a>
          </div>
        </div>
      </div>
    </div>
    <!--国家区号-->
    <mobile-home v-show="show_mobile_home" v-on:closeMobileHome="closeMobileHome"></mobile-home>
    <!--/.国家区号-->
    <Close @closeClick="closeLogin" v-if="showCloseStatus" @closeBtn="closeBtn"></Close>

  </div>
</template>

<script>
    import mobileHome from '../../components/mobile-home/mobile-home';
    import Close from '@/components/close/close';
    import { getLocalStorage, setLocalStorage, isPoneAvailable } from '../../utils/Tools';
    export default {
        name: "forget-password",
        data(){
          return {
            phone: '',
            show_mobile_home: false,
            areaCode: '+86',
            hasInput: 0,//进入游戏按钮是否disable
            showApp:1,
            showCloseStatus:0,
          }
        },
        components: {
          mobileHome,
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
        watch:{

          phone(newV, oldV) {
            if (newV != '' && this.phone != '') {
              this.hasInput = 1;
            } else {
              this.hasInput = 0;
            }
          }

        },
        methods: {

          targetSecond(){

            if(isPoneAvailable(this.phone)){
              this.$router.push({name: 'forgetPasswordSecond', query:{}});
              setLocalStorage('phone', this.phone);
            }else{
              alert('手机格式不正确');
            }

          },

          changeArea(){

            this.show_mobile_home = true;

          },

          closeMobileHome(data){

            this.show_mobile_home = false;
            if(data != -1){
              this.areaCode = data;
            }
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
