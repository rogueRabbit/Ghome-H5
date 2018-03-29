<template>
  <div class="index_wrap realName">
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
        <div class="login_form">
          <h3>实名认证<img src="static/img/index/gl_tips.png" alt="" class="tips" @click="closeIntro(1)"></h3>
          <div class="smallContent">
            <div class="title">{{content}}</div>
          </div>
          <div class="name">
            <label for="">
              姓名
            </label>
            <input type="text" name="" id="" class="myName" placeholder="请输入您的真实姓名">
          </div>
          <div class="name idcard">
              <label for="">
                身份证
              </label>
              <input type="text" name="" id="" class="myName" placeholder="请输入有效的身份证号码">
            </div>
          <div class="btns bottomClick">
            <a class="btn" @click="gotoLogin()">确定</a>
          </div>
        </div>
      </div>
    </div>
    <div class="introId" v-if="showIntroAlert">
      <div class="content">
        <div class="introContent">
          {{AlertContent}}
          <div class="concat">*海外用户请联系客服。</div>
        </div>
        <div class="btns bottomClick">
            <a class="btn" @click="closeIntro(0)">我知道了</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getPostData } from '@/api/ghhttp.js'
  import { APIs } from '@/api/requestUrl'
  import './realName.scss'
  /* eslint-disable */
  export default {
    name: "RealName",
    data() {
      return {
        content:'按照文化部《网络游戏管理暂行办法》的相关要求，网络游戏用户需要使用有效的身份证件进行实名注册才能登录游戏；身份证信息只能提交一次不可修改，请谨慎填写。',
        AlertContent:'您的身份证信息仅用于实名补填，我们不会将此信息用于其他任何场景。',
        showIntroAlert:0
      };
    },
    created: function () { },
    ready() {
    },
    mounted: function () {

    },
    methods: {
      getSmallIdList() {
        let params={
          userId:this.$route.params.userid,
          deviceid:this.$route.params.deviceid
        };
        getPostData(APIs.querySmallAccount(), params, (data) => {
          let dataList=this.dataList;
        });
      },
      gotoLogin() {

        let params = {
          ua: '1.1',
          phone: this.phone,
          password: this.loginPassword,
          deviceid: 1,
          group: 1,
          supportPic: 2
        };

        getPostData(APIs.getLoginUrl(), params, (res) => {

        })
      },
      goBack() {
        window.history.go(-1);
      },
      emailColor(item){
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        return reg.test(item); 
      },
      showRedColor(listNum){
        this.dataList.map((item,index)=>{
          item.select = 0;
        });
        //显示选中的代码
        this.dataList.map((item,index)=>{
          if(listNum==index){
            item.select = 1;
          }
        });
      },
      closeIntro(index){
        if(index == 0){
          this.showIntroAlert = 0;
        }else{
          this.showIntroAlert = 1;
        }
      }
    }
  };
</script>