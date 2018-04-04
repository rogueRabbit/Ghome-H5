<template>
  <div class="index_wrap realName" v-if="showApp">
    <div class="index_main">
      <div class="header_bar">
        <a class="close">
          <i class="icon_close" @click="closeAlert"></i>
        </a>
      </div>
    </div>
    <Close @closeClick="closeLogin" v-if="showCloseStatus" @closeBtn="closeBtn"></Close>
  </div>
</template>

<script>
    import Loading from '@/components/loading/';
    import Close from '@/components/close/close';
    export default {
        name: "judge-pay-url",
        data(){
          return {
            showApp: 1,
            showCloseStatus: 0,
          }
        },
        components: { Close },
        created: function(){



        },
        mounted: function(){

          // let loadingTest = Loading(
          //   {
          //     message: '',
          //     duration: 10
          //   }
          // );
          //
          // loadingTest.close();

          if(this.$route.query.flag){

            let flagStr = this.$route.query.flag;
            if(flagStr==1){//实名
              this.$router.push({
                name: 'realName', query: {from: 'pay'}
              });

            }else{//游客登录、游客登录+实名
              this.$router.push({
                name: 'msgLogin', query: {from: 'pay'}
              });
            }
          }

        },
        methods: {

          closeLogin() {
            this.showApp = 0;
            this.showCloseStatus = 0;
          },
          closeAlert() {
            this.showCloseStatus = 1;
          },
          closeBtn() {
            this.showCloseStatus = 0;
          },

        }

    }
</script>

<style scoped>

</style>
