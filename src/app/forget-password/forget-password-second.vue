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
          <p class="send-tips" v-if="true">已发送短信至<span class="receive-phone">1555</span></p>
          <div class="item reset-phone">
            <input type="password" placeholder="请输入登录密码"  v-model="loginPassword">
            <span class="get_yzm" @click="getSmsCode()">获取验证码</span>
          </div>
          <p class="no_yzm scene-2" @click="sendVoiceCode">收不到验证码?</p>
          <div class="btns next-action">
            <a class="btn" @click="targetThird()">下一步</a>
          </div>
        </div>
      </div>
      <!--风控组件-->
      <risk-management v-if="is_show_risk==8" v-bind:riskData="riskData" v-on:sendmess="sendmess" v-on:closeRiskDialog="closeRiskDialog"></risk-management>
      <!--/.风控组件-->

      <!--语音验证码-->
      <voice-code v-if="showVoice" v-bind:areaCode="areaCode" v-bind:phone="phone" v-on:closeVoiceDialog="closeVoiceDialog" v-on:showRiskDialog="showRiskDialog"></voice-code>
      <!--/.语音验证码-->
    </div>
  </div>
</template>

<script>
    import { APIs } from '@/api/requestUrl';
    import { getPostData } from '@/api/ghhttp.js';
    import riskManagement from '../../components/risk-management/risk-management';
    import voiceCode from '../../components/voice-code/voice-code';

    export default {
        name: "forget-password-second",
        data(){
          return {
            areaCode: '+86',
            phone: '',
            loginPassword: '',
            send_code_success: false,
            riskData:{
              checkCodeGuid: '',
              checkCodeUrl:'',
              imagecodeType: '',
              sdg_height: 0,
              sdg_width: 0,
              phone: ''
            },
            is_show_risk: 0,   //0--表示无下一步， 8 表示下一步需要进行图形验证码,
            showVoice: false,  //是否显示语音验证码的风控,
          }
        },
        components: {
          riskManagement,
          voiceCode
        },
        mounted: function(){

            this.phone = this.$route.query.phone;

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

            sendmess(index) {
              let params = {
                phone: this.phone,
                supportPic: 2,
                type: 4,
                voiceMsg: 0
              };
              if(index){
                params.voiceMsg=1;
              }
              getPostData(APIs.getRequestSmsCodeUrl(), params, (data) => {
                console.log(data);
                this.is_show_risk = data.nextAction;
                this.riskData['checkCodeGuid'] = data.checkCodeGuid;
                this.riskData['checkCodeUrl'] = data.checkCodeUrl;
                this.riskData['imagecodeType'] = data.imagecodeType;
                this.riskData['sdg_height'] = data.sdg_height;
                this.riskData['sdg_width'] = data.sdg_width;
                this.riskData['phone'] = this.phone;
              });
            },

            targetThird(){

              this.$router.push({name: 'forgetPasswordThird', query:{phone: this.phone}});

            },

            closeRiskDialog(){

              this.is_show_risk = -1;

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

            }
          }
    }
</script>

<style scoped>

</style>
