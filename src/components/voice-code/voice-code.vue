<template>
  <div>
    <div class="dialog-wrap voice-wrap">
      <div class="container">
        <div class="header">
          <a class="close" @click="closeVoiceDialog()"><i class="icon_close"></i></a>
        </div>
        <div class="main-content">
          <div class="voice-title">
            <span>如果您收不到短信验证码，请您尝试接听来自：</span>
            <span class="phone">021-5054740</span>
            <span>语音电话并获取验证码。</span>
          </div>
          <div class="tips-content">
            <span>温馨提示：</span>
            <span>如果您曾经屏蔽过盛大游戏的短信推送，请发送000000至10690079以解除屏蔽</span>
          </div>
          <button class="confirm-button gray">56</button>
        </div>
      </div>
    </div>
    <div class="dialog-mask"></div>
  </div>
</template>

<script>
    import './voice-wrap.scss';
    export default {
        name: "voice-code",
        methods: {

          //点击左上角的关闭
          closeVoiceDialog(){

            this.$emit('closeVoiceDialog');

          }

        }
    }
</script>

<style scoped>

</style>
