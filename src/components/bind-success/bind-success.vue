<template>
	<div>
		<div class="dialog-wrap success-wrap">
			<div class="container">
				<div class="header">
					<a class="close" @click="closeBindSuccessDialog()">
						<i class="icon_close"></i>
					</a>
				</div>
				<div class="main-content">
					<p class="bind-title">恭喜您，账号绑定成功！</p>
					<div class="remark-message">
						<div>请牢记您的登录账号：
							<span class="important">{{phone}}</span>
						</div>
						<div>此账号备注姓名：
							<span class="important">{{node}}</span>
						</div>
					</div>
					<button class="confirm-button" @click="closeBindSuccessDialog()">知道了</button>
					<p class="save-tips">建议您截图保存当前页面</p>
				</div>
			</div>
		</div>
		<div class="dialog-mask"></div>
	</div>
</template>

<script>
	import './bind-success.scss';
	export default {
		name: "bind-success",
		props: ['node', "phone","guestData"],
		methods: {

			closeBindSuccessDialog() {
				let params = {
					deviceid: window.deviceid,
					group: 'game',
					phone: this.phone,
					sms_new: 1,
					sms_type: 4
				};
				if (this.guestData.hasExtendAccs == 1) {
					//有小号进入小号选择界面
					this.$router.push({
						name: 'smallId', query: {
							userid: this.guestData.userid,
							deviceid: params.deviceid,
							phone: params.phone
						}
					});
				} else {
					//表示没有小号，判断是否需要实名认证
					if (this.guestData.realInfo_status == 1) {
						//实名认证
						this.$router.push({
							name: 'realName', query: {
								userid: this.guestData.userid,
								deviceid: params.deviceid,
								userData: JSON.stringify(this.guestData),
								smgData: JSON.stringify(this.riskData),
								phone: params.phone
							}
						});
					} else {
						//不需要实名情况下判断是否需要激活
						if (this.guestData.activation == 1) {
							//需要激活
							this.$router.push({
								name: 'activeuser', query: {
									userData: JSON.stringify(this.guestData),
									phone: params.phone
								}
							});
						} else {
							//直接进入游戏
						}
					}
				}
				this.$emit('closeBindSuccessDialog');

			}

		}
	}
</script>

<style scoped>
</style>