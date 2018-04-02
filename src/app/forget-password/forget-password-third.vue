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
  import { APIs } from '@/api/requestUrl';
  import { getPostData } from '@/api/ghhttp.js';
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
            resData: ''
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

          if(this.$route.query.resData){
           let routeData = this.$route.query.resData;
           this.resData = JSON.parse(routeData);
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

            let params = {
              authTicket: '',
              deviceid: window.deviceid,
              password:this.loginPassword
            };

            getPostData(APIs.getSetPasswordUrl(), params, (res, responseCode) => {
              if(responseCode ==0){

                let phone = this.areaCode + '-' + this.phone;
                console.log('--'+this.resData.hasExtendAccs);
                console.log('--'+this.resData.realInfo_status);
                console.log('--'+this.resData.activation);
                if (this.resData.hasExtendAccs == 1) {
                    //有小号进入小号选择界面
                    this.$router.push({
                      name: 'smallId', query: {
                        userid: this.resData.userid,
                        deviceid: params.deviceid,
                        phone: phone
                      }
                    });
                }else {
                  //表示没有小号，判断是否需要实名认证
                  if (this.resData.realInfo_status == 1) {
                      //实名认证
                      this.$router.push({
                          name: 'realName', query: {
                          userid: res.userid,
                          deviceid: params.deviceid,
                          userData: JSON.stringify(this.resData),
                          phone: phone
                        }
                      });
                  } else {
                    //不需要实名情况下判断是否需要激活
                    if (this.resData.activation == 1) {
                        //需要激活
                        this.$router.push({
                            name: 'activeuser', query: {
                            userData: JSON.stringify(this.resData),
                            phone: phone
                          }
                        });
                    } else {
                      //直接进入游戏
                    }
                  }
                }
              }
            })
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
