<template>
	<div class="index_wrap realName" v-if="showApp">
		<div class="index_main">
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
					<h3>实名认证
						<img src="static/img/index/gl_tips.png" alt="" class="tips" @click="closeIntro(1)">
					</h3>
					<div class="smallContent">
						<div class="title">{{content}}</div>
					</div>
					<div class="name">
						<label for="">
							姓名
						</label>
						<input type="text" name="" id="" class="myName" placeholder="请输入您的真实姓名" v-model="name">
					</div>
					<div class="name idcard">
						<label for="">
							身份证
						</label>
						<input type="text" name="" id="" class="myName" placeholder="请输入有效的身份证号码" v-model="idcard">
					</div>
					<div class="btns bottomClick" v-if="isMust">
						<a class="btn" @click="gotoNext(1)">确定</a>
					</div>
					<div class="btns isMust" v-if="!isMust">
						<a class="btn" @click="gotoNext(1)">确定</a>
						<a class="btn MustRight" @click="gotoNext(0)">跳过</a>
					</div>
				</div>
			</div>
		</div>
		<div class="introId" v-if="showIntroAlert">
			<div class="content">
				<div class="introContent">
					{{AlertContent}}
					<div class="concat">*海外用户请联系客服。</div>
				</div>
				<div class="btns bottomClick">
					<a class="btn" @click="closeIntro(0)">我知道了</a>
				</div>
			</div>
		</div>
		<Close @closeClick="closeLogin" v-if="showCloseStatus" @closeBtn="closeBtn"></Close>
	</div>
</template>

<script>
	import { getPostData } from '@/api/ghhttp.js'
	import { APIs } from '@/api/requestUrl'
	import './realName.scss'
	import Close from '@/components/close/close'
	/* eslint-disable */
	export default {
		name: "RealName",
		data() {
			return {
				content: '按照文化部《网络游戏管理暂行办法》的相关要求，网络游戏用户需要使用有效的身份证件进行实名注册才能登录游戏；身份证信息只能提交一次不可修改，请谨慎填写。',
				AlertContent: '您的身份证信息仅用于实名补填，我们不会将此信息用于其他任何场景。',
				showIntroAlert: 0,
				isMust: 1,
				name: '',
				idcard: '',
				smgData: '',
				userData: '',
				showApp: 1,
				showCloseStatus: 0

			};
		},
		created: function () { },
		ready() {
		},
		mounted: function () {
			if (this.$route.query.smgData) {
				this.smgData = JSON.parse(this.$route.query.smgData);
			}
			if (this.$route.query.userData) {
				this.userData = JSON.parse(this.$route.query.userData);
			}
			if (this.userData && this.userData.realInfo_force == 1) {
				//必须进行激活
				this.isMust = 1;
			} else if (this.userData && this.userData.realInfo_force == 0) {
				this.isMust = 0;
			}
		},
		components: { Close },
		methods: {
			goBack() {
				window.history.go(-1);
			},
			closeIntro(index) {
				if (index == 0) {
					this.showIntroAlert = 0;
				} else {
					this.showIntroAlert = 1;
				}
			},
			gotoNext(index) {
				if (index == 1) {
					//实名认证
					let params = {
						idcard: this.idcard,
						name: this.name
					};
					if (this.isRealName(this.name) != true) {
						alert('真实姓名填写有误');
					} else if (this.isCard(this.idcard) != true) {
						alert('身份证号填写有误');
					} else {
						getPostData(APIs.getFillRealInfoUrl(), params, (data) => {
							console.log(data);
							//判断是否需要激活
							if (this.userData != '' && this.userData.activation == 1) {//1表示需要激活
								this.$router.push({
									name: 'activeuser', query: {
										userData: this.$route.query.userData,
										smgData: this.$route.query.smgData,
										phone: this.$route.query.phone
									}
								});
							} else {
								//进入游戏
							}
						});
					}
				} else {
					//跳过实名认证直接进入激活界面
					console.log(this.userData != '' && this.userData.activation == 1);
					if (this.userData != '' && this.userData.activation == 1) {//1表示需要激活
						this.$router.push({
							name: 'activeuser', query: {
								userData: this.$route.query.userData,
								smgData: this.$route.query.smgData,
								phone: this.$route.query.phone
							}
						});
					} else {
						//不需要激活直接进入游戏
					}
				}
			},
			isRealName(name) {
				let regName = /^[\u4e00-\u9fa5]{2,4}$/;
				if (regName.test(name)) {
					return true;
				}else{
					return false;
				}
			},
			isCard(card) {
				let regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (regIdNo.test(card)) {
					return true;
				}else{
					return false;
				}
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