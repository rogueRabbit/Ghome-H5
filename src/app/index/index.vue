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
            <div class="index_login" v-if="showNumber==-1&&userType!=''">
                <div class="index_act">
                    <div class="logo"></div>
                    <div class="btns">
                        <a class="btn" @click="goToMsgLogin">账号登录</a>
                        <a class="btn btn_border" v-if="userType.guest_enable==1">游客登录</a>
                    </div>
                </div>
                <ul class="third_type" v-if="userType.display_thirdaccout&&showThree==1">
                    <li class="cur">
                        <i class="dy"></i>
                        <p>叨鱼</p>
                    </li>
                    <li>
                        <i class="wb"></i>
                        <p>微博</p>
                    </li>
                    <li>
                        <i class="wx"></i>
                        <p>微信</p>
                    </li>
                </ul>
                <div class="other_type" v-if="userType.display_thirdaccout&&showOther==1" @click="showThreeLogo"></div>
                <div class="bottom_box">
                    <input type="checkbox">
                    <b></b>我同意服务条款及隐私政策
                </div>
            </div>

            <!-- 短信登录 -->
            <div class="login_form" v-if="showNumber==0">
                <h3>短信登录</h3>
                <div class="item">
                    <label class="country">+86
                        <span class="down"></span>
                    </label>
                    <input type="text" placeholder="请输入手机号码" class="phone">
                </div>
                <div class="item">
                    <input type="text" placeholder="请输入短信验证码">
                    <span class="get_yzm">获取验证码</span>
                </div>
                <p class="no_yzm">收不到验证码?</p>
                <div class="btns">
                    <a class="btn">进入游戏</a>
                </div>
                <div class="bottom_box">
                    <a class="link">密码登录</a>
                </div>
            </div>

            <!-- 密码登录 -->
            <PwdLogin v-if="showNumber==1"></PwdLogin>
        </div>

    </div>


</template>

<script>
    import "./index.scss";
    import PwdLogin from "../pwdLogin/pwdLogin"
    /* eslint-disable */
    export default {
        name: "HomePage",
        data() {
            return {
                showNumber: -1,//-1显示登录首页，0表示短信登录页面，1密码登录页面
                userType: '',
                showThree: 0,
                showOther:1
            };
        },
        components: { PwdLogin },
        created: function () { },
        ready() {
        },
        mounted: function () {
            if (this.$store.state.token == '') {
                console.log(this.$store);
                this.$store.dispatch('PublicKey', () => {
                    this.$store.dispatch('getAppConfigure', (data) => {
                        //获取用户配置
                        let mock=''
                        mockData?mock:mock = {
                            daoyu_enable: 1,
                            device_feature: "",
                            display_thirdaccout: 0,
                            greport_log_level: "all",
                            guest_enable: 0,
                            log_level: "all",
                            show_guest_confirm: 1,
                            weibo_appKey: "4115557623",
                            weibo_enable: 1,
                            weibo_redirectUrl: "https://www.sdo.com",
                            weixin_appId: "wx4b5f6da6126099ec",
                            weixin_enable: 1,
                            weixin_key: "3f31750780dda7daff947cbd695cefd3"
                        };
                        this.userType = mock?mock:data;
                        if(this.userType.display_thirdaccout == 0&&this.userType.guest_enable == 0){
                            this.showNumber = 0;
                        }
                        console.log(data);
                    });
                });
            }
        },
        methods: {
            sendmess() {
                if (this.$store.state.token != '') {
                    this.$store.dispatch('getPhonemsAction', (data) => {
                        console.log(data);
                    });
                }
            },
            showThreeLogo() {
                this.showThree = 1;
                this.showOther = 0;
            },
            goToMsgLogin(){
                this.showNumber = 0;
            },
            goBack(){
                switch(this.showNumber){
                    case 0:
                        this.showNumber = -1;
                }
            }
        }
    };
</script>