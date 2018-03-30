<template>
  <div class="index_wrap">
    <div class="index_main">
      <div class="header_bar">
        <a class="back">
          <i class="icon_back" @click="goBack"></i>
        </a>
        <a class="close">
          <i class="icon_close"></i>
        </a>
      </div>
      <div class="pwdLogin">
        <div class="login_form visitor-page">
          <h3>游客升级</h3>
          <p class="prompt">
            您输入的账号目前已有角色，我们会为您的手机号：
            <span class="phone">{{$route.query.phone}}</span>下关联一个账号，您可以为这个账号进行备注，以供自己辨识。
          </p>
          <div class="remarks">
            <input type="text" v-model="note" />
          </div>
          <div class="btns next-action">
            <a class="btn" @click="confirmRemarks">确定</a>
          </div>
        </div>
      </div>
    </div>
    <!--账号绑定成功-->
    <bind-success v-if="is_success" v-on:closeBindSuccessDialog="closeBindSuccessDialog" :node="message" :phone="phone" :guestData="guestData"></bind-success>
    <!--/.账号绑定成功-->
  </div>
</template>

<script>
  import bindSuccess from '../../components/bind-success/bind-success';
  import { getPostData } from '@/api/ghhttp.js';
  import { APIs } from '@/api/requestUrl'
  export default {
    name: "visitor-upgrade",
    data() {
      return {
        is_success: false,
        note: '',
        userData:JSON.parse(this.$route.query.userData),//用来获取下个接口的登录票据
        guestData:'',//游客信息，包括是否实名，激活等等
        phone:this.$route.query.phone,
        message:''
      }
    },
    watch:{
      note(newV){
        this.message = newV;
      }
    },
    components: {
      bindSuccess
    },
    mounted:function(){

    },
    methods: {

      goBack() {

        this.$router.push({ name: 'HomePage', params: {} })


      },

      confirmRemarks() {
        let guestParams = {
          deviceid: window.deviceid,
          group: 'game',
          guestId: this.userData.userid,
          guestType: 1,
          subDesc: this.note,
          upgrade_ticket: this.userData.ticket
        };
        getPostData(APIs.getGuestUpgradeUrl(), guestParams, (data) => {
          let resData = data;
          this.guestData = data;
          this.is_success = 1;
        });

      },

      closeBindSuccessDialog() {

        this.is_success = false;

      }
    }
  }
</script>

<style scoped>
</style>