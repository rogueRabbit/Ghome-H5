<template>
	<div>
		<!--阿里验证码-->
		<div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>
		<!--/.阿里验证码-->
		<div class="dialog-wrap risk-wrap">
			<div class="container">
				<div class="header">
					<a class="close" @click="closeRiskDialog()">
						<i class="icon_close"></i>
					</a>
				</div>
				<div class="main-content">
					<!--普通图片验证码-->
					<div v-if="riskData.imagecodeType==1">
						<p class="title">请输入下面的图形验证码</p>
						<div class="code-image">
							<img :src="riskData.checkCodeUrl" class="ordinary-risk-image" @click="refreshImage()" ref="riskImage" />
						</div>
						<div class="input-area">
							<input type="text" class="code-input" placeholder="请输入正确的验证码" v-model="checkCode" maxlength="6" />
						</div>
						<button class="confirm-button" @click="VerificationCode()">确定</button>
					</div>
					<!--/.普通图片验证码-->
					<!--阿里验证码-->
					<div v-if="riskData.imagecodeType==2">
					  <div>
              <img src="../../assets/img/ali_bg2.png">
            </div>
            <div id="alitest"></div>
          </div>
					<!--/.阿里验证码-->
				</div>
			</div>
		</div>
		<div class="dialog-mask"></div>
	</div>
</template>

<script>
import './risk-management.scss';
import { getPostData } from '@/api/ghhttp.js'
import { APIs } from '@/api/requestUrl';
import Toast from '@/components/toast';
export default {
	name: "riskManagement",
	props: {
		riskData: {
			type: Object,
			required: true
		},
		isPwd: {
			required: false
		},
		isGuest: {
			required: false
		},
    voiceMsg: {
		  type: Number,
		  required: false,
      default: 0
    }
	},
	data() {
		return {
			//风控验证码的图片尺寸
			imageCodeStyle: {
				width: this.riskData.sdg_width + 'px',
				height: this.riskData.sdg_height + 'px',
			},
			checkCode: '',
			outInfo: 0,
      imageType: '',
      loadingTest: '',
      appkey: '',
      scene: ''
		}
	},
	mounted: function () {

	  this.imageType = this.riskData.imagecodeType;

	},

  watch: {

    imageType(newV){

      if(newV==2){

        let checkCodeUrl = this.riskData.checkCodeUrl;
        this.appkey = this.getUrlParam(checkCodeUrl, 'appkey');
        this.scene = this.getUrlParam(checkCodeUrl, 'scene');
        this.createAliCode();
      }
    },
  },

	methods: {

		//点击图片进行刷新
		refreshImage() {

			this.riskData['checkCodeUrl'] = this.riskData['checkCodeUrl'] + "&" + (+new Date);

		},

		//验证风控验证码
		VerificationCode() {
			if (this.isPwd && this.isPwd == 1) {//密码登录页面跳转的风控验证
				if (this.isGuest && this.isGuest == 1) {
					//游客密码登录风控
					this.checkCodeUrl(APIs.getCheckCodeAuthUrl());
				} else {
					//非游客密码登录风控
					this.checkCodeUrl(APIs.getCheckCodeLoginUrl());
				}
			} else {
				let param = {
					checkCode: this.checkCode,
					checkCodeGuid: this.riskData.checkCodeGuid,
					outInfo: this.outInfo,
					phone: this.riskData.areaCode + '-' + this.riskData.phone,
					sms_new: 1,
					supportPic: 0,
					type: 4,
					voiceMsg: this.voiceMsg
				};
				getPostData(APIs.getCheckCodeSendSmsUrl(), param, (data, responseCode, responseMessage) => {
					if (this.riskData.imagecodeType == 1) {//图片验证码
						if (data.nextAction == 0 && responseCode == 0) {
							this.$emit('closeRiskDialog', 0);
						} else if (data.nextAction == 0 && responseCode == 1023) {//短信发送太频繁
              Toast({
                message: responseMessage,
                duration: 3000
              });
						} else {//输入错误
              Toast({
                message: responseMessage,
                duration: 3000
              });
							this.refreshImage();
						}
					} else if (this.riskData.imagecodeType == 2) {//阿里验证码
						if (data.nextAction == 0 && responseCode == 0) {
							this.$emit('closeRiskDialog', 0);
						}else {
              Toast({
                message: responseMessage,
                duration: 3000
              });
            }
					}
				}, (err) => {
          if (this.riskData.imagecodeType == 1){
            this.refreshImage();
          }
				})
			}
		},
		checkCodeUrl(url) {
			let param = {
				checkCodeGuid: this.riskData.checkCodeGuid,
				deviceid: window.deviceid,
				group: 'game',
				outInfo: this.outInfo,
				password: this.checkCode,
				supportPic: 0
			};
			getPostData(url, param, (data, responseCode, responseMessage) => {
				console.log(responseCode);

				if (this.riskData.imagecodeType == 1) {//图片验证码
					if (data.nextAction == 0 && responseCode == 0) {
						this.$emit('closeRiskDialog', 0);
					} else if (data.nextAction == 0 && responseCode == 1023) {//短信发送太频繁
            Toast({
              message: responseMessage,
              duration: 3000
            });
					} else {//输入错误
						this.refreshImage();
					}
				} else if (this.riskData.imagecodeType == 2) {//阿里验证码

					if (data.nextAction == 0 && responseCode == 0) {
						this.$emit('closeRiskDialog', 0);
					}
				}
			}, (err) => {
				this.refreshImage();
			})
		},
		//点击左上角的关闭
		closeRiskDialog() {

			this.$emit('closeRiskDialog', -1);

		},

    getUrlParam(url, name) {

      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = url.slice(url.indexOf("?")).substr(1).match(reg);
      if (r != null)
        return unescape(decodeURIComponent(r[2]));
      return null;

    },

    createAliCode(){

      var nc = new noCaptcha();
      var nc_token = [this.appkey, (new Date()).getTime(), Math.random()].join(':');
		  var nc_option = {
        renderTo: '#alitest',
        appkey: this.appkey,
        scene: this.scene,
        nc_token: nc_token,
        callback: (data) => {
          console.log(JSON.stringify(data));
          this.outInfo = data;
          this.VerificationCode();
        }
      };

      nc.init(nc_option);
    }

	}
}
</script>

<style scoped>

</style>
