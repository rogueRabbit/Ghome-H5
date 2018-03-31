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
    <mobile-home v-if="show_mobile_home" v-on:closeMobileHome="closeMobileHome"></mobile-home>
    <!--/.国家区号-->
  </div>
</template>

<script>
    import mobileHome from '../../components/mobile-home/mobile-home';
    export default {
        name: "forget-password",
        data(){
          return {
            phone: '',
            show_mobile_home: false,
            areaCode: '+86',
            hasInput: 0,//进入游戏按钮是否disable
          }
        },
        components: {
          mobileHome
        },
        mounted: function(){

          this.phone = this.$route.query.phone;
          this.areaCode = this.$route.query.areaCode;

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

            this.$router.push({name: 'forgetPasswordSecond', query:{phone: this.phone, areaCode: this.areaCode}});

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

            this.$router.push({name: 'pwdLogin', query:{phone: this.phone, areaCode: this.areaCode}});

          }

        }
    }
</script>

<style scoped>

</style>
