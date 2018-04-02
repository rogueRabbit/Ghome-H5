<template>
	<div class="index_wrap PwdLogin" v-if="showApp">
		<div class="index_main" v-if='!showArea'>
			<div class="header_bar">
				<a class="back">
					<i class="icon_back" @click="goBack"></i>
				</a>
				<a class="close">
					<i class="icon_close" @click="closeAlert"></i>
				</a>
			</div>
			<div class="pwdLogin">
				<div class="login_form">
					<h3>账号登录</h3>
					<div class="item">
						<label class="country" @click="changeArea">{{areaCode}}
							<span class="down"></span>
						</label>
						<input type="text" placeholder="请输入手机号码" class="phone" v-model="phone" autocomplete="off">
					</div>
					<div class="item">
						<input type="password" placeholder="请输入登录密码" class="password-input" v-model="loginPassword">
						<i class="lock-icon"></i>
						<span class="get_yzm forget-password" @click="gotoForgetPassword()">忘记密码</span>
					</div>
					<div class="btns goGameBtn">
						<a class="btn" @click="gotoLogin()" :class="hasInput?'':'disabledClick'">进入游戏</a>
					</div>
					<div class="bottom_box">
						<a class="link" @click="switchPhoneLogin()">短信登录</a>
					</div>
				</div>
			</div>
		</div>

		<!--风控组件-->
		<risk-management v-if="is_show_risk==8" v-bind:riskData="riskData" v-on:closeRiskDialog="closeRiskDialog" isPwd="1" isGuest="1"></risk-management>
		<!--/.风控组件-->

		<Close @closeClick="closeLogin" v-if="showCloseStatus" @closeBtn="closeBtn"></Close>
		<!--国家区号-->
		<mobile-home v-show="show_mobile_home" v-on:closeMobileHome="closeMobileHome" :areaCodeTest="areaCode"></mobile-home>
		<!--/.国家区号-->
	</div>
</template>

<script>
import { getPostData } from '@/api/ghhttp.js'
import { APIs } from '@/api/requestUrl'
import { country } from '../msgLogin/country.js'
import riskManagement from '@/components/risk-management/risk-management';
import Close from '@/components/close/close';
import { getLocalStorage, setLocalStorage } from '../../utils/Tools';
import mobileHome from '@/components/mobile-home/mobile-home';
/* eslint-disable */
export default {
	name: "PwdLogin",
	data() {
		return {
			phone: '',
			loginPassword: '',
			countryList: country(),
			wordList: [
				'常用', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
				'H', 'I', 'J', 'K', 'L', 'M', 'N',
				'O', 'P', 'Q', 'R', 'S', 'T', 'U',
				'V', 'W', 'X', 'Y', 'Z'
			],
			areaCode: '+86',
			showArea: 0,
			hasInput: 0,//进入游戏按钮是否disable
			isGuestLogin: 0,
			is_show_risk: 0,
			riskData: {
				checkCodeGuid: '',
				checkCodeUrl: '',
				imagecodeType: '',
				sdg_height: 0,
				sdg_width: 0,
				phone: '',
				areaCode: '+86',
				msgCode: ''
			},
			resData: '',
			showApp: 1,
			showCloseStatus: 0,
			show_mobile_home: 0
		};
	},
	components: { riskManagement, Close,mobileHome },
	created: function () { },
	ready() {
	},
	mounted: function () {
		if (this.$route.query.pageSource) {
			//游客进入登录
			this.isGuestLogin = 1;
		}

		if (getLocalStorage('phone') != null) {
			this.phone = getLocalStorage('phone');
		}

		if (getLocalStorage('areaCode') != null) {
			this.areaCode = getLocalStorage('areaCode');
		}

	},
	watch: {
		loginPassword(newV, oldV) {
			if (newV != '' && this.phone != '') {
				this.hasInput = 1;
			} else {
				this.hasInput = 0;
			}
		},
		phone(newV, oldV) {
			if (newV != '' && this.loginPassword != '') {
				this.hasInput = 1;
			} else {
				this.hasInput = 0;
			}
			setLocalStorage('phone', newV);
		},
		areaCode(newV) {
			this.riskData['areaCode'] = newV;
			setLocalStorage('areaCode', newV);
		},
	},
	methods: {
		closeMobileHome(data) {

			this.show_mobile_home = false;
			if (data != -1) {
				this.areaCode = data;
			}
		},
		//关闭风控验证码的弹框及后续操作
		closeRiskDialog(type) {
			let params = {
				deviceid: deviceid,
				group: "game",
				password: this.loginPassword,
				phone: this.phone,
				supportPic: 1
			};
			this.is_show_risk = -1;
			if (type == 0) {
				//验证码校验成功后跳转
				this.$router.push({
					name: 'visitorUpgrade', query: {
						userid: this.resData.userid,
						deviceid: params.deviceid,
						phone: params.phone,
						userData: JSON.stringify(this.resData),
						guestData: this.$route.query.guestData
					}
				});
			}
		},
		gotoLogin() {

			let params = {
				deviceid: deviceid,
				group: "game",
				password: this.loginPassword,
				phone: this.phone,
				supportPic: 1
			};
			if (this.hasInput == 1 && this.isPoneAvailable(this.phone)) {
				setLocalStorage('phone', this.phone);
				if (this.isGuestLogin == 1) {
					getPostData(APIs.getAuthUrl(), params, (data) => {
						let resData = data;
						this.resData = data;
						this.is_show_risk = data.nextAction;
						this.riskData['checkCodeGuid'] = data.checkCodeGuid;
						this.riskData['checkCodeUrl'] = data.checkCodeUrl;
						this.riskData['imagecodeType'] = data.imagecodeType;
						this.riskData['sdg_height'] = data.sdg_height;
						this.riskData['sdg_width'] = data.sdg_width;
						this.riskData['phone'] = this.phone;
						if (this.is_show_risk != 8) {
							this.$router.push({
								name: 'visitorUpgrade', query: {
									userid: resData.userid,
									deviceid: params.deviceid,
									phone: params.phone,
									userData: JSON.stringify(resData),
									guestData: this.$route.query.guestData
								}
							});
						}
					})
				} else {
					getPostData(APIs.getLoginUrl(), params, (data) => {
						let resData = data;
						//测试用start
						/* resData.hasExtendAccs = 0;
						resData.realInfo_status = 1 */
						//测试数据结束end
						if (resData.hasExtendAccs == 1) {
							//有小号进入小号选择界面
							this.$router.push({
								name: 'smallId', query: {
									userid: resData.userid,
									deviceid: params.deviceid,
									phone: params.phone
								}
							});
						} else {
							//表示没有小号，判断是否需要实名认证
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
						}
					});
				}
			} else {
				alert('手机格式不正确');
			}
		},
		sendmess(index) {
			let params = {
				phone: this.areaCode + this.phone,
				sms_new: 1,
				supportPic: 2,
				type: 4,
				voiceMsg: 0
			};
			if (index) {
				params.voiceMsg = 1;
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
				this.riskData['areaCode'] = this.areaCode;
			});
		},
		isPoneAvailable(str) {
			let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(str)) {
				return false;
			} else {
				return true;
			}
		},
		//点击忘记密码
		gotoForgetPassword() {

			this.$router.push({ name: 'forgetPasswordOne', query: { phone: this.phone, areaCode: this.areaCode } });

		},

		switchPhoneLogin() {

			window.history.go(-1);

		},

		goBack() {
			window.history.go(-1);
		},

		changeArea() {
			this.show_mobile_home = 1;
		},
		getCountryList(word) {
			let selectList = this.countryList.filter(item => item.word === word)
			if (selectList.length > 0) {
				return 1
			} else {
				return 0
			}
		},
		onSelect(flag, text) {
			this.areaCode = flag;
			this.showArea = 0;
		},
		closeAreaSelect() {
			this.showArea = 0;
		},
		closeLogin() {
			this.showApp = 0;
			this.showCloseStatus = 0;
		},
		closeAlert() {
			this.showCloseStatus = 1;
		},
		closeBtn() {
			this.showCloseStatus = 0;
		}
	}
};
</script>
