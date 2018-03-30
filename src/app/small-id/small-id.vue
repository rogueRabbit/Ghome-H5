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
          <div class="smallContent" v-if="dataList!=''">
            <div class="title">请选择你要登录的账号</div>
            <div class="smallList" v-for="(item,key) in dataList" :key="key" @click="showRedColor(key)" :class="item.select?'emailRed':''">
              {{item.accdesc}}
            </div>
          </div>
          <div class="btns">
            <a class="btn" @click="gotoLogin()" :class="isSlectId?'':'noSelect'">进入游戏</a>
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
        dataList: "",
        isSlectId: false,
        selectSmallId: ''
      };
    },
    created: function () { },
    watch: {
      selectSmallId(newV) {
        if (this.selectSmallId != '') {
          this.isSlectId = true;
        }
      }
    },
    ready() {
    },
    mounted: function () {
      setTimeout(()=>{
        this.getSmallIdList();//获取小号列表
      },100);
    },
    methods: {
      getSmallIdList() {
        let params = {
          deviceid: this.$route.query.deviceid,
          userId: this.$route.query.userid
        };
        getPostData(APIs.querySmallAccount(), params, (data) => {
          this.dataList = data.extendAccs.map((item) => {
            item.select = 0;
            return item;
          });
        });
      },
      gotoLogin() {

        let params = {
          deviceId: this.$route.query.deviceid,
          phone: this.selectSmallId.accname
        };
        if (this.isSlectId == true) {
          getPostData(APIs.smallAccountLogin(), params, (res) => {
            let resData = res;
            //判断实名
            if (resData.realInfo_status == 1) {
              //实名认证
              this.$router.push({
                name: 'realName', query: {
                  userid: resData.userid,
                  deviceid: params.deviceid,
                  userData: JSON.stringify(resData),
                  phone: this.$route.query.phone
                }
              });
            } else {
              //不需要实名情况下判断是否需要激活
              if (resData.activation == 1) {
                //需要激活
                this.$router.push({
                  name: 'activeuser', query: {
                    userData: JSON.stringify(resData),
                    phone: this.$route.query.phone
                  }
                });
              } else {
                //直接进入游戏
              }
            }
          })
        }
      },
      goBack() {
        window.history.go(-1);
      },
      emailColor(item) {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        return reg.test(item);
      },
      showRedColor(listNum) {
        this.dataList.map((item, index) => {
          item.select = 0;
        });
        //显示选中的代码
        this.dataList.map((item, index) => {
          if (listNum == index) {
            item.select = 1;
            this.selectSmallId = item;
          }
        });
      }

    }
  };
</script>