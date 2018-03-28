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

            <!-- 密码登录 -->
            <PwdLogin v-if="showNumber==1"></PwdLogin>
        </div>
    </div>


</template>

<script>
    import "./index.scss";
    import PwdLogin from "../pwdLogin/pwdLogin"
    import { APIs } from '@/api/requestUrl'
    import { getPostData } from '@/api/ghhttp.js'
    /* eslint-disable */
    export default {
        name: "LoginPwd",
        data() {
            return {
                showNumber: 1,//-1显示登录首页，0表示短信登录页面，1密码登录页面
                userType: '',
                showThree: 0,
                showOther: 1,
                phone: '',
                is_show_risk: 0,   //0--表示无下一步， 8 表示下一步需要进行图形验证码,
                riskData:{
                  checkCodeGuid: '',
                  checkCodeUrl:'',
                  imagecodeType: '',
                  sdg_height: 0,
                  sdg_width: 0,
                  phone: ''
                },
              select:1,//默认选择用户条款
              showUserPro:0
            };
        },
        components: { PwdLogin},
        created: function () { },
        ready() {
        },
        mounted: function () {
            if (this.$store.state.token == '') {
            }
        },
        methods: {
            goBack() {
                window.history.go(-1);
            }
        }
    };
</script>
