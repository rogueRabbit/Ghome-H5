<template>
  <div>
    <div class="visitor-entry">
      <div class="container">
        <div class="header">
          <a class="close" @click="closeVisitorDialog()"><i class="icon_close"></i></a>
        </div>
        <div class="title">
          当前为游客登录，为了您游戏便捷及账号安全，请尽快绑定为正式游戏账号。
        </div>
        <div class="button-group">
          <button class="option-button left-button">进入游戏</button>
          <button class="option-button right-button">立即绑定</button>
        </div>
      </div>
    </div>
    <div class="visitor-mask"></div>
  </div>
</template>

<script>
    import './visitor-login-entry.scss';
    export default {
        name: "visitor-login-entry",
        methods: {

          closeVisitorDialog(){

            this.$emit('closeVisitorDialog');

          }

        }
    }
</script>

<style scoped>

</style>
