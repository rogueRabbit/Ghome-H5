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
    <mobile-home v-show="show_mobile_home" v-on:closeMobileHome="closeMobileHome" :areaCodeTest="areaCode"></mobile-home>
    <!--/.国家区号-->
    <Close @closeClick="closeLogin" v-if="showCloseStatus" @closeBtn="closeBtn"></Close>

    <!--风控组件-->
    <risk-management v-if="is_show_risk==8" v-bind:riskData="riskData" v-on:sendmess="sendmess" v-on:closeRiskDialog="closeRiskDialog"></risk-management>
    <!--/.风控组件-->

    <!--语音验证码-->
    <voice-code v-if="showVoice" v-bind:areaCode="areaCode" v-bind:phone="phone" v-on:closeVoiceDialog="closeVoiceDialog" v-on:showRiskDialog="showRiskDialog"></voice-code>
    <!--/.语音验证码-->

  </div>
</template>

<script>
    import { APIs } from '@/api/requestUrl';
    import { getPostData } from '@/api/ghhttp.js';
    import mobileHome from '@/components/mobile-home/mobile-home';
    import Close from '@/components/close/close';
    import { getLocalStorage, setLocalStorage, isPoneAvailable } from '../../utils/Tools';
    import Toast from '@/components/toast';
    import riskManagement from '@/components/risk-management/risk-management';


    export default {
        name: "forget-password",
        data(){
          return {
            phone: '',
            show_mobile_home: false,
            areaCode: '+86',
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
          mobileHome,
          Close,
          riskManagement
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
              this.sendmess();
            }else{
              Toast({
                message: '手机号码格式不正确',
                duration: 3000
              })
            }
          },

          sendmess() {
            let params = {
              phone: this.areaCode+this.phone,
              sms_new: 1,
              supportPic: 2,
              type: 4,
              voiceMsg: 0
            };

            getPostData(APIs.getRequestSmsCodeUrl(), params, (data, responseCode) => {
              if(responseCode==0){
                if (data.nextAction != 8) {
                  this.$router.push({name: 'forgetPasswordSecond', query:{}});
                  setLocalStorage('phone', this.phone);
                  setLocalStorage('areaCode', this.areaCode);
                  setLocalStorage('sendSuccess', 1);
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
        }
    }
</script>

<style scoped>

</style>
