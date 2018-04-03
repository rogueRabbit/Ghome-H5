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
					<p class="concatTitle">为了你的账号安全，请设置登录密码</p>
					<div class="item registerDisable">
						<label class="country">{{areaCode}}
							<span class="down"></span>
						</label>
						<input type="text" placeholder="请输入手机号码" class="phone" v-model="phone" autocomplete="off" disabled>
					</div>
					<div class="item">
						<input type="password" placeholder="请设置登录密码" class="password-input noRegester" v-model="loginPassword">
						<i class="lock-icon"></i>
					</div>
					<div class="btns goGameBtn">
						<a class="btn" @click="setPwd()" :class="hasInput?'':'disabledClick'">进入游戏</a>
					</div>
				</div>
			</div>
		</div>

		<Close @closeClick="closeLogin" v-if="showCloseStatus" @closeBtn="closeBtn"></Close>

	</div>
</template>

<script>
	import { getPostData } from '@/api/ghhttp.js'
	import { APIs } from '@/api/requestUrl'
	import Close from '@/components/close/close';
	import { getLocalStorage, setLocalStorage } from '../../utils/Tools';
	/* eslint-disable */
	export default {
		name: "NoRegister",
		data() {
			return {
				phone: '',
				loginPassword: '',
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
		components: { Close },
		created: function () { },
		ready() {
		},
		mounted: function () {
			if (this.$route.query.isGuestLogin) {
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
				if (newV != '') {
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
			setPwd() {
				let resData = JSON.parse(this.$route.query.userData);
				console.log(resData);
				if (this.hasInput == 1) {
					setLocalStorage('phone', this.phone);
					if (this.isGuestLogin == 1) {
						//游客掉该接口登录，接口不一样
						//游客已升级进入设置
						let params = {
							authTicket: resData.ticket,
							deviceid: deviceid,
							password: this.loginPassword
						};
						getPostData(APIs.getSetPasswordUrl(), params, (data) => {
							//游客重置密码结束，直接进入游戏
						});
					} else {
						//正常用户登录流程
						let params = {
							authTicket:'',
							deviceid: deviceid,
							password: this.loginPassword
						};
						getPostData(APIs.getSetPasswordUrl(), params, (data) => {
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

			isPoneAvailable(str) {
				let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(str)) {
					return false;
				} else {
					return true;
				}
			},



			goBack() {
				window.history.go(-1);
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