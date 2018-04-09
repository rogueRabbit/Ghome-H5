<template>
	<div class="index_wrap" v-if="showApp">
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
				<div class="login_form visitor-page">
					<h3>游客升级</h3>
					<p class="prompt">
						您输入的账号目前已有角色，我们会为您的手机号：
						<span class="phone">{{$route.query.phone}}</span>下关联一个子账号，您可以为这个子账号进行备注，以供自己辨识。
					</p>
					<div class="remarks">
						<input type="text" v-model="note" />
					</div>
					<div class="btns next-action">
						<a class="btn" @click="confirmRemarks" :class="hasInput?'':'disabledClick'">确定</a>
					</div>
				</div>
			</div>
		</div>
		<!--账号绑定成功-->
		<bind-success v-if="is_success" v-on:closeBindSuccessDialog="closeBindSuccessDialog" :node="message" :phone="phone" :guestData="guestData"></bind-success>
		<!--/.账号绑定成功-->
		<Close @closeClick="closeLogin" v-if="showCloseStatus" @closeBtn="closeBtn"></Close>
	</div>
</template>

<script>
	import bindSuccess from '../../components/bind-success/bind-success';
	import { getPostData } from '@/api/ghhttp.js';
	import { APIs } from '@/api/requestUrl'
	import Close from '@/components/close/close'
	import Loading from '@/components/loading/'
	import Toast from '@/components/toast';
	export default {
		name: "visitor-upgrade",
		data() {
			return {
				is_success: false,
				note: '',
				userData: JSON.parse(this.$route.query.userData),//用来获取下个接口的登录票据
				guestData: '',//游客信息，包括是否实名，激活等等
				phone: this.$route.query.phone,
				message: '',
				showApp: 1,
				showCloseStatus: 0,
				hasInput: 0
			}
		},
		watch: {
			note(newV) {
				this.message = newV;
				if (newV != '') {
					this.hasInput = 1;
				} else {
					this.hasInput = 0;
				}
			}
		},
		components: {
			bindSuccess,
			Close
		},
		mounted: function () {

		},
		methods: {
			getByteLen(val) {
				var len = 0;
				let ChinaNum = 0;
				for (var i = 0; i < val.length; i++) {
					var a = val.charAt(i);
					if (a.match(/[^\x00-\xff]/ig) != null) {
						len += 2;
						ChinaNum++;
					}
					else {
						len += 1;
					}
				}
				if (ChinaNum > 7) {
					return false;
				} else if (len > 19) {
					return false;
				} else {
					return true;
				}
			},
			checkUsername(username) {
				//正则表达式
				var reg = new RegExp("^[#_A-Za-z0-9\u4e00-\u9fa5]+$");
				if (!reg.test(username)) {
					return false;
				} else {
					return true;
				}
			},
			goBack() {

				this.$router.push({ name: 'HomePage', params: {} })


			},

			confirmRemarks() {
				let guestParams = {
					deviceid: window.deviceid,
					group: 'game',
					guestId: JSON.parse(this.$route.query.guestData).guestId,
					guestType: 1,
					subDesc: this.note,
					upgrade_ticket: this.userData.ticket
				};
				if (this.hasInput == 1) {
					if (this.checkUsername(this.note)) {
						if (this.getByteLen(this.note)) {
							/* let loadingTest = Loading(
								{
									message: '',
									duration: 10
								}
							); */
							getPostData(APIs.getGuestUpgradeUrl(), guestParams, (data) => {
								let resData = data;
								//loadingTest.close();
								this.guestData = data;
								this.is_success = 1;
							});
						} else {
							Toast({
								message: '小号备注名过长',
								duration: 3000
							})
						}
					} else {
						Toast({
							message: '备注名格式错误，仅支持中英文数字_以及#',
							duration: 3000
						})
					}
				}
			},

			closeBindSuccessDialog() {

				this.is_success = false;
				//判断是否需要设置密码
				if (this.userData.noPassword == 1) {
					this.$router.push({
						name: 'noRegister', query: {
							userid: this.userData.userid,
							deviceid: deviceid,
							userData: JSON.stringify(this.userData),
							isGuestLogin: 1
						}
					});
				} else {
					//直接进入游戏
					if (getSessionStorage('gameUserList')) {
						let gameList = JSON.parse(getSessionStorage('gameUserList'));
						let userData = JSON.parse(this.$route.query.userData);
						gameList.push({
							userid: userData.userid,
							ticket: userData.ticket
						});
						setSessionStorage('gameUserList', JSON.stringify(gameList));
					} else {
						let gameList = [];
						gameList.push({
							userid: userData.userid,
							ticket: userData.ticket
						});
						setSessionStorage('gameUserList', JSON.stringify(gameList));
					}
					this.$router.push({ name: 'game' });
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
	}
</script>

<style scoped>
</style>