<template>
  <div class="index_wrap">
    <div class="index_main">
      <div class="header_bar">
        <a class="back">
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
            <label class="country">+86
              <span class="down"></span>
            </label>
            <input type="text" placeholder="请输入手机号码" class="phone" v-model="phone" autocomplete="off">
          </div>
          <div class="btns next-action">
            <a class="btn" @click="targetSecond()">下一步</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "forget-password",
        data(){
          return {
            phone: '',
          }
        },
        mounted: function(){

          this.phone = this.$route.query.phone;

        },
        methods: {

          targetSecond(){

            this.$router.push({name: 'forgetPasswordSecond', query:{phone: this.phone}});

          }

        }
    }
</script>

<style scoped>

</style>
