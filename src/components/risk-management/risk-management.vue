<template>
  <div>
    <div class="risk-wrap">
      <div class="container">
        <div class="header">
          <a class="close" @click="closeRiskDialog()">
            <i class="icon_close"></i>
          </a>
        </div>
        <div class="main-content">
          <p class="title">请输入下面的图形验证码</p>
          <div class="code-image">
            <img :src="riskData.checkCodeUrl" class="ordinary-risk-image" @click="refreshImage()" />
          </div>
          <div class="input-area">
            <input type="text" class="code-input" placeholder="请输入正确的验证码" v-model="checkCode" maxlength="6" />
          </div>
          <button class="confirm-button" @click="VerificationCode()">确定</button>
        </div>
      </div>
    </div>
    <div class="risk-mask"></div>
    <!--阿里验证码-->
    <div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>
    <!--/.阿里验证码-->
  </div>
</template>

<script>
  // import '../assets/css/nc/nc.css';
  import './risk-management.scss';
  import '../../assets/js/nc';
  import { getPostData } from '@/api/ghhttp.js'
  import { APIs } from '@/api/requestUrl'
  export default {
    name: "riskManagement",
    props: {
      riskData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        //风控验证码的图片尺寸
        imageCodeStyle: {
          width: this.riskData.sdg_width + 'px',
          height: this.riskData.sdg_height + 'px',
        },
        checkCode: ''
      }
    },
    ready() {

      console.log('***' + this.riskData);
      //注入阿里验证的方法
      this.injectionAliVerification();


    },

    methods: {

      //点击图片进行刷新
      refreshImage() {

        this.$emit('sendmess');

      },

      //验证风控验证码
      VerificationCode() {

        let param = {
          checkCode: this.checkCode,
          checkCodeGuid: this.riskData.checkCodeGuid,
          outInfo: 0,
          phone: this.riskData.areaCode + this.riskData.phone,
          sms_new:1,
          supportPic: 0,
          type: 4,
          voiceMsg: 0 
        };

        getPostData(APIs.getCheckCodeSendSmsUrl(), param, (data) => {

        }, (err) => {
          //this.$emit('sendmess');
        })
      },

      //注入阿里验证的方法
      injectionAliVerification() {

        var nc = new noCaptcha();
        var nc_appkey = '1';  // 应用标识,不可更改'FFFF0000000001794A8B'
        var nc_scene = '2';  //场景,不可更改'register'
        var ud = '3'; //userdata,igw用
        var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
        var nc_option = {
          renderTo: '#alitest',//渲染到该DOM ID指定的Div位置
          appkey: nc_appkey,
          scene: nc_scene,
          token: nc_token,
          // trans: '{"name1":"code100"}',//测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
          callback: function (data) {// 校验成功回调
            var submit = {
              seccode: data.csessionid,
              validate: data.sig,
              challenge: nc_token,
              password: 'alitest'
            }

          }
        };

      },

      //点击左上角的关闭
      closeRiskDialog() {

        this.$emit('closeRiskDialog');

      }
    }
  }
</script>

<style scoped>
</style>