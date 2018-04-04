<template>
  <div class="index_wrap" v-if="showApp">
    <div class="index_main">
      <div class="header_bar">
        <a class="close">
          <i class="icon_close" @click="closeAlert"></i>
        </a>
      </div>
      <div class="pwdLogin">
        <div class="login_form pay">
          <h3>游客登录</h3>
          <div class="title">
            当前为游客登录，为了您游戏便捷及账号安全，请尽快绑定为正式游戏账号。
          </div>
        </div>
        <div class="button-group">
          <button class="option-button left-button" @click="directLogin">进入游戏</button>
          <button class="option-button right-button" @click="immediatelyBind">立即绑定</button>
        </div>
      </div>
    </div>
    <Close @closeClick="closeLogin" v-if="showCloseStatus" @closeBtn="closeBtn"></Close>
  </div>
</template>

<script>
    import Close from '@/components/close/close';
    import { getPostData } from '@/api/ghhttp.js'
    import { APIs } from '@/api/requestUrl'
    export default {
        name: "pay-visitor-entry",
        data() {
          return {
            showApp: 1,
            showCloseStatus: 0,
            GetGuestData: ''
          };
        },
        components: { Close },
        methods: {

          closeLogin() {
            this.showApp = 0;
            this.showCloseStatus = 0;
          },
          closeAlert() {
            this.showCloseStatus = 1;
          },
          closeBtn() {
            this.showCloseStatus = 0;
          },

          //直接点击进入游戏
          directLogin() {
            let params = {
              deviceid: deviceid,
              supportAutoLogin: 1
            };
            getPostData(APIs.getGuestLoginUrl(), params, (res) => {
              let resData = res;
              if (resData.has_realInfo == 0 && resData.realInfo_status == 1) {
                //实名认证
                this.$router.push({
                  name: 'realName', query: {
                    userid: resData.userid,
                    deviceid: params.deviceid,
                    userData: JSON.stringify(resData),
                    smgData: JSON.stringify(this.riskData),
                    phone: params.phone
                  }
                });
              } else {
                //不需要实名情况下判断是否需要激活
                if (resData.activation == 1) {
                  //需要激活
                  this.$router.push({
                    name: 'activeuser', query: {
                      userData: JSON.stringify(resData),
                      phone: params.phone
                    }
                  });
                } else {
                  //直接进入游戏
                }
              }
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
          }

        }
    }
</script>

<style scoped>

</style>
