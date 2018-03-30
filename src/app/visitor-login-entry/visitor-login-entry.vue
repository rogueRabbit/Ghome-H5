<template>
  <div>
    <div class="dialog-wrap visitor-entry">
      <div class="container">
        <div class="header">
          <a class="close" @click="closeVisitorDialog()">
            <i class="icon_close"></i>
          </a>
        </div>
        <div class="title">
          当前为游客登录，为了您游戏便捷及账号安全，请尽快绑定为正式游戏账号。
        </div>
        <div class="button-group">
          <button class="option-button left-button" @click="directLogin">进入游戏</button>
          <button class="option-button right-button" @click="immediatelyBind">立即绑定</button>
        </div>
      </div>
    </div>
    <div class="dialog-mask"></div>
  </div>
</template>

<script>
  import { getPostData } from '@/api/ghhttp.js'
  import { APIs } from '@/api/requestUrl'
  import './visitor-login-entry.scss';
  export default {
    name: "visitor-login-entry",
    data() {
      return {
        GetGuestData: ''
      }
    },
    props: ['guestData'],
    mounted: function () {
      this.GetGuestData = this.guestData;
    },
    methods: {

      closeVisitorDialog() {

        this.$emit('closeVisitorDialog');

      },

      //直接点击进入游戏
      directLogin() {

        getPostData(APIs.getGuestLoginUrl(), {}, (res) => {

        })
      },

      //点击立即绑定
      immediatelyBind() {

        this.$router.push({
          name: 'msgLogin', query: {
            pageSource: 'visitor-login',
            guestData: JSON.stringify(this.GetGuestData)
          }
        });
        // this.$router.push({ name: 'visitorUpgrade', query: { pageSource: 'visitor-login'} })

      }


    }
  }
</script>

<style scoped>
</style>