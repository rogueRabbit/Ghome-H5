<template>
  <div>
    <div class="dialog-wrap voice-wrap">
      <div class="container">
        <div class="header">
          <a class="close" @click="closeVoiceDialog()"><i class="icon_close"></i></a>
        </div>
        <div class="main-content">
          <div class="voice-title">
            <span>如果您收不到短信验证码，请您尝试接听来自：</span>
            <span class="phone">021-5054740</span>
            <span>语音电话并获取验证码。</span>
          </div>
          <div class="tips-content">
            <span>温馨提示：</span>
            <span>如果您曾经屏蔽过盛大游戏的短信推送，请发送000000至10690079以解除屏蔽</span>
          </div>
          <button class="confirm-button" @click="sendmess" v-if="!show_count_down">获取语音验证码</button>
          <button class="confirm-button gray" v-if="show_count_down">{{count_time}}</button>
        </div>
      </div>
    </div>
    <div class="dialog-mask"></div>
    <!--风控组件-->
    <risk-management v-if="is_show_risk==8" v-bind:riskData="riskData"  v-on:closeRiskDialog="closeRiskDialog"></risk-management>
    <!--/.风控组件-->
  </div>
</template>

<script>
    import './voice-wrap.scss';
    import { APIs } from '@/api/requestUrl'
    import { getPostData } from '@/api/ghhttp.js';
    import riskManagement from '../../components/risk-management/risk-management';
    export default {
        name: "voice-code",
        props: {
          areaCode: {
            required: true
          },
          phone: {
            required: true
          }
        },
        data(){
          return {
            show_count_down: false,
            count_time: 60,
            voice_time_out:'',
            is_show_risk: 0,
            riskData: {
              checkCodeGuid: '',
              checkCodeUrl: '',
              imagecodeType: '',
              sdg_height: 0,
              sdg_width: 0,
              phone: '',
              areaCode: '',
              msgCode: ''
            },
          }
        },
        components: {
          riskManagement
        },
        created: function () {

        },
        ready() {
        },
        mounted: function(){


        },
        watch: {

          areaCode(newV){

            this.riskData['areaCode'] = newV;

          },
          phone(newV){

            this.riskData['phone'] = newV;

          },
          count_time(newV) {
            if (newV == 0) {
              this.count_time = '';
              this.show_count_down = false;
            }
          }

        },
        methods: {

          //发送语音验证码
          sendmess(){

            let params = {
              phone: this.areaCode + this.phone,
              sms_new:1,
              supportPic: 2,
              type: 4,
              voiceMsg: 1
            };

            getPostData(APIs.getRequestSmsCodeUrl(), params, (data) => {
              console.log(data);

              let nextAction = data.nextAction;
              if(nextAction==0){
                this.show_count_down = true;
                this.showTimeCount();
              }else if(nextAction == 8){//风控的情况
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

          //点击左上角的关闭
          closeVoiceDialog(){

            this.$emit('closeVoiceDialog');

          },

          closeRiskDialog(type) {

            this.is_show_risk = -1;
            if(type == 0){//图片风控验证码，校验成功
              this.show_count_down = true;
              this.showTimeCount();
            }
          },

          showTimeCount() {
            this.count_time--;
            if (this.count_time > 0) {
              setTimeout(this.showTimeCount, 1000);
            }
          },

        }
    }
</script>

<style scoped>

</style>
