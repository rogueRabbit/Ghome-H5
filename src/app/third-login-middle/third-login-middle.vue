<template>
  <div class="index_wrap" >
    <div class="index_main">
    </div>
  </div>
</template>

<script>
    import { APIs } from '@/api/requestUrl';
    import { getPostData } from '@/api/ghhttp.js';
    import { getSessionStorage,setSessionStorage} from '../../utils/Tools';
    import Loading from '@/components/loading/';
    export default {
        name: "third-login-middle",
        data(){
          return {
            weiboCode: '',
            loadingTest: ''
          }
        },
        mounted: function(){

          //微博授权后，url会携带code
          if(this.$route.query.code){

            this.loadingTest = Loading(
              {
                message: '',
                duration: 10
              }
            );

			this.weiboCode = this.$route.query.code;
			setTimeout(()=>{
				this.thirdLogin();
			},2000);
          }

        },
        methods: {

          thirdLogin(){

            let params = {
              third_ticket: this.weiboCode
            };

            getPostData(APIs.getThirdAccountTicketLogin(), params, (data) => {
              this.loadingTest.close();
              let resData = data;
              if (resData.noPassword == 1) {
                //新注册的用户，到注册界面设置密码
                this.$router.push({
                  name: 'noRegister', query: {
                    userid: resData.userid,
                    deviceid: params.deviceid,
                    userData: JSON.stringify(resData),
                    phone: params.phone
                  }
                });
              } else {
                if (resData.hasExtendAccs == 1) {
                  //有小号进入小号选择界面
                  this.$router.push({
                    name: 'smallId', query: {
                      userid: resData.userid,
                      deviceid: params.deviceid,
                      phone: params.phone
                    }
                  });
                } else {
                  //表示没有小号，判断是否需要实名认证
                  if (resData.has_realInfo == 0 && resData.realInfo_status == 1) {
                    //实名认证
                    this.$router.push({
                      name: 'realName', query: {
                        userid: resData.userid,
                        deviceid: params.deviceid,
                        userData: JSON.stringify(resData),
                        smgData: JSON.stringify(this.riskData),
                        phone: params.phone
                      }
                    });
                  } else {
                    //不需要实名情况下判断是否需要激活
                    if (resData.activation == 1) {
                      //需要激活
                      this.$router.push({
                        name: 'activeuser', query: {
                          userData: JSON.stringify(resData),
                          phone: params.phone
                        }
                      });
                    } else {
                      //直接进入游戏
                      if(getSessionStorage('gameUserList')){
                        let gameList=JSON.parse(getSessionStorage('gameUserList'));
                        gameList.push({
                          userid:resData.userid,
                          ticket:resData.ticket,
                          autokey:resData.autokey
                        });
                        setSessionStorage('gameUserList',JSON.stringify(gameList));
                      }else{
                        let gameList=[];
                        gameList.push({
                          userid:resData.userid,
                          ticket:resData.ticket,
                          autokey:resData.autokey
                        });
                        setSessionStorage('gameUserList',JSON.stringify(gameList));
                      }
                      this.$router.push({ name: 'game'});
                    }
                  }
                }
              }
            });
          }
        }
    }
</script>

<style scoped>

</style>
