<template>
  <div>
    <!--阿里验证码-->
    <div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>
    <!--/.阿里验证码-->
  </div>
</template>

<script>
    import '../assets/css/nc/nc.css';
    import '../assets/js/nc';
    export default {
        name: "risk-management",
        props: {
          imagecodeType: {
            type: Number,
            required: true
          },
          checkCodeUrl: {
            type: String,
            required: true
          }
        },
        ready() {

            //注入阿里验证的方法
            this.injectionAliVerification();


        },
        mounted: {





        },
        methods: {

          //验证风控验证码
          VerificationCode(){

            let data = {
              checkCodeGuid: 1,
              checkCode: 1,
              phone: '+86-17621933537',
              type: 4,
              voiceMsg: 0,
              supportPic: 1,
              outInfo: 1,
              sms_new: 1
            };

            if (this.$store.state.token != '') {
              this.$store.dispatch('picCheckSmsSend2', data, (data)=>{

              });
            }
          },

          //注入阿里验证的方法
          injectionAliVerification(){

            var nc = new noCaptcha();
            var nc_appkey = '1';  // 应用标识,不可更改'FFFF0000000001794A8B'
            var nc_scene = '2';  //场景,不可更改'register'
            var ud = '3'; //userdata,igw用
            var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
            var nc_option = {
              renderTo: '#alitest',//渲染到该DOM ID指定的Div位置
              appkey: nc_appkey,
              scene: nc_scene,
              token: nc_token,
              // trans: '{"name1":"code100"}',//测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
              callback: function (data) {// 校验成功回调
                var submit = {
                  seccode: data.csessionid,
                  validate: data.sig,
                  challenge: nc_token,
                  password: 'alitest'
                }

              }
            };

          }

        }
    }
</script>

<style scoped>

</style>
