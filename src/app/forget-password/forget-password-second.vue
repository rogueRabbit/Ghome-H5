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
          <p class="send-tips" v-if="showTime">已发送短信至<span class="receive-phone">{{phone}}</span></p>
          <div class="item reset-phone">
            <input type="password" placeholder="请输入验证码"  v-model="verifyCode">
            <span class="get_yzm" @click="getSmsCode()" v-if="!showTime">获取验证码</span>
            <span class="get_yzm" v-if="showTime">{{timeNumber}}'</span>
          </div>
          <p class="no_yzm scene-2" @click="sendVoiceCode">收不到验证码?</p>
          <div class="btns next-action">
            <a class="btn" @click="targetThird()" :class="hasInput?'':'disabledClick'">下一步</a>
          </div>
        </div>
      </div>
      <!--风控组件-->
      <risk-management v-if="is_show_risk==8" v-bind:riskData="riskData" v-on:sendmess="sendmess" v-on:closeRiskDialog="closeRiskDialog"></risk-management>
      <!--/.风控组件-->

      <!--语音验证码-->
      <voice-code v-if="showVoice" v-bind:areaCode="areaCode" v-bind:phone="phone" v-on:closeVoiceDialog="closeVoiceDialog" v-on:showRiskDialog="showRiskDialog"></voice-code>
      <!--/.语音验证码-->

      <Close @closeClick="closeLogin" v-show="showCloseStatus" @closeBtn="closeBtn"></Close>

    </div>
  </div>
</template>

<script>
    import { APIs } from '@/api/requestUrl';
    import { getPostData } from '@/api/ghhttp.js';
    import riskManagement from '../../components/risk-management/risk-management';
    import voiceCode from '../../components/voice-code/voice-code';
    import Close from '@/components/close/close';
    import { getLocalStorage, setLocalStorage, isPoneAvailable, removeStorage } from '../../utils/Tools';
    export default {
        name: "forget-password-second",
        data(){
          return {
            areaCode: '+86',
            phone: '',
            verifyCode: '',
            send_code_success: false,
            riskData:{
              checkCodeGuid: '',
              checkCodeUrl:'',
              imagecodeType: '',
              sdg_height: 0,
              sdg_width: 0,
              phone: '',
              areaCode: ''
            },
            is_show_risk: 0,   //0--表示无下一步， 8 表示下一步需要进行图形验证码,
            showVoice: false,  //是否显示语音验证码的风控,
            timeNumber: 60,//倒计时
            showTime: 0,
            hasInput: 0,//进入游戏按钮是否disable
            showApp:1,
            showCloseStatus:0,
          }
        },
        components: {
          riskManagement,
          voiceCode,
          Close
        },
        mounted: function(){

          if(getLocalStorage('phone')!=null){
            this.phone = getLocalStorage('phone');
          }

          if(getLocalStorage('areaCode')!=null){
            this.areaCode = getLocalStorage('areaCode');
          }

          if(getLocalStorage('sendSuccess')==1){
            this.timeNumber = 60;
            this.showTime = 1;
            this.showTimeCount();
          }

        },
        watch:{

          timeNumber(newV) {
            if (newV == 0) {
              this.timeNumber = '';
              this.showTime = 0;
            }
          },

          verifyCode(newV, oldV) {
            if (newV != '' && this.verifyCode != '') {
              this.hasInput = 1;
            } else {
              this.hasInput = 0;
            }
          }

        },
        methods: {

          getSmsCode() {
            //获取短信验证码
            if(this.isPoneAvailable(this.phone)){
              this.sendmess();
            }else{
              alert('请输入正确手机号');
            }
          },

          isPoneAvailable(str) {
            let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!myreg.test(str)) {
              return false;
            } else {
              return true;
            }
          },

          sendmess() {
            let params = {
              phone: this.phone,
              sms_new: 1,
              supportPic: 2,
              type: 4,
              voiceMsg: 0
            };

            getPostData(APIs.getRequestSmsCodeUrl(), params, (data, responseCode) => {
              if(responseCode==0){
                if (data.nextAction != 8) {
                  this.timeNumber = 60;
                  this.showTime = 1;
                  this.showTimeCount();
                }
                this.is_show_risk = data.nextAction;
                this.riskData['checkCodeGuid'] = data.checkCodeGuid;
                this.riskData['checkCodeUrl'] = data.checkCodeUrl;
                this.riskData['imagecodeType'] = data.imagecodeType;
                this.riskData['sdg_height'] = data.sdg_height;
                this.riskData['sdg_width'] = data.sdg_width;
                this.riskData['phone'] = this.phone;
                this.riskData['areaCode'] = this.areaCode;
              }
            });
          },

          showTimeCount() {
            this.timeNumber--;
            if (this.timeNumber > 0) {
              setTimeout(this.showTimeCount, 1000);
            }
          },

          targetThird(){

            let params = {
              deviceid: window.deviceid,
              group: 'game',
              phone: this.areaCode + '-' + this.phone,
              sms_new: 1,
              sms_type: 4,
              smscode: this.verifyCode,
            };

            getPostData(APIs.smsLogin(), params, (res, responseCode) => {
              if(responseCode == 0){
                removeStorage('sendSuccess');
                this.$router.push({name: 'forgetPasswordThird', query:{resData: JSON.stringify(res)}});
              }
              console.log(res);
            });
          },

          closeRiskDialog(type){

            this.is_show_risk = -1;
            if(type == 0){//风控验证码，校验成功，
              this.timeNumber = 60;
              this.showTime = 1;
              this.showTimeCount();
            }

          },
          sendVoiceCode(){

            this.showVoice = true;

          },
          closeVoiceDialog() {

            this.showVoice = false;

          },
          //语音验证码中需要出现风控的情况
          showRiskDialog(fromChildData){

            this.riskData = fromChildData;
            this.is_show_risk = 8;

          },

          backPage(){

            removeStorage('sendSuccess');
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
