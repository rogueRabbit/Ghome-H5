<template>
  <div class="index_wrap small-id">
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
          <h3>账号登录</h3>
          <div class="smallContent">
            <div class="title">请选择你要登录的账号</div>
            <div class="smallList" v-for="(item,key) in dataList" :key="key" @click="showRedColor(key)" :class="item.select?'emailRed':''">
              {{item.accname}}
            </div>
          </div>
          <div class="btns">
            <a class="btn" @click="gotoLogin()">进入游戏</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getPostData } from '@/api/ghhttp.js'
  import { APIs } from '@/api/requestUrl'
  import './small-id.scss'
  /* eslint-disable */
  export default {
    name: "SmallId",
    data() {
      return {
        dataList:[
          {
            accdesc :'111',
            accid :'accid',
            accname :'accname ',
            select:0
          },
          {
            accdesc :'111',
            accid :'accid',
            accname :'wangpanhhsdf@126.com ',
            select:0
          },
          {
            accdesc :'111',
            accid :'accid',
            accname :'accname ',
            select:0
          },
          {
            accdesc :'111',
            accid :'accid',
            accname :'accname ',
            select:0
          },
          {
            accdesc :'111',
            accid :'accid',
            accname :'accname ',
            select:0
          },
          {
            accdesc :'111',
            accid :'accid',
            accname :'accname ',
            select:0
          }
        ]
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
      }

    }
  };
</script>