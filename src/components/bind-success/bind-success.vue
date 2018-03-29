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
            <p>请牢记您的登录账号：<span class="important">151720888</span></p>
            <p>此账号备注姓名：<span class="important">酱香饼</span></p>
          </div>
          <button class="confirm-button" @click="VerificationCode()">确定</button>
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
        methods: {

          closeBindSuccessDialog(){

            this.$emit('closeBindSuccessDialog');

          }

        }
    }
</script>

<style scoped>

</style>
