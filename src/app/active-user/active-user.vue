<template>
	<div class="index_wrap ActiveUser" v-if="showApp">
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
					<h3>请输入激活码</h3>
					<div class="item activerUserDisabled" v-if="!isThree">
						<label class="country">{{areaCode}}
							<span class="down"></span>
						</label>
						<input type="text" placeholder="手机号码自动获取" class="phone" v-model="phone" autocomplete="off" disabled>
					</div>
					<div class="item">
						<input type="password" placeholder="请输入激活码" class="password-input" v-model="activeCode">
						<i class="lock-icon"></i>
					</div>
					<div class="btns bottomGoGame">
						<a class="btn" @click="gotoLogin()" :class="hasInput?'':'disabledClick'">进入游戏</a>
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
	import Close from '@/components/close/close'
	import Loading from '@/components/loading/'
	/* eslint-disable */
	export default {
		name: "ActiveUser",
		data() {
			return {
				phone: '',
				activeCode: '',
				isThree: 0,
				areaCode: '+86',
				hasInput: 0,
				showApp: 1,
				showCloseStatus: 0
			};
		},
		components: { Close },
		created: function () { },
		ready() {
		},
		watch: {
			activeCode(newV) {
				if (newV != '') {
					this.hasInput = 1;
				} else {
					this.hasInput = 0;
				}
			}
		},
		mounted: function () {
			let phoneList = this.$route.query.phone.split('-');
			this.areaCode = phoneList[0];
			this.phone = phoneList[1];
		},
		methods: {

			gotoLogin() {

				let params = {
					activation: this.activeCode
				};
				let loadingTest = Loading(
					{
						message: '',
						duration: 10
					}
				);
				getPostData(APIs.getActivateCheckUrl(), params, (res) => {
					loadingTest.close();
					console.log(res);
				})
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