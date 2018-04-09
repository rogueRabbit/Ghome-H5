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
					<p class="bind-title">恭喜您，已成功升级！</p>
					<div class="remark-message">
						<div>请牢记您的登录账号：
							<span class="important">{{phone}}</span>
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
		name: "success-nextaction",
		props: ['node', "phone","guestData"],
		methods: {

			closeBindSuccessDialog() {
				this.$emit('closeBindSuccessDialog');

			}

		}
	}
</script>

<style scoped>
</style>
