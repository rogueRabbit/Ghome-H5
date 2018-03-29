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
            <!-- 登录首页 -->
            <div class="index_login" v-if="showNumber==-1&&userType!=''">
                <div class="index_act">
                    <div class="logo"></div>
                    <div class="btns">
                        <a class="btn" @click="goToMsgLogin">账号登录</a>
                        <a class="btn btn_border" v-if="userType.guest_enable==1" @click="visitorLogin">游客登录</a>
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
                    <input type="checkbox" name="select" id="" v-model="select" value="select" class="selectInput">
                    <img src="static/img/index/gl_ok.png" alt="" class="selectLogo" v-if="select">
                    <img src="static/img/index/gl_no.png" alt="" class="selectLogo" v-if="!select">
                    <span @click="showUserAlertClick">我同意服务条款及隐私政策</span>
                </div>
            </div>
        </div>

        <!-- 用户协议start -->
        <UserProtocol v-if="showUserPro" @hideUserAlert="hideUserAlert"></UserProtocol>
        <UserIsSelect v-if="showUserAlert" @closeUserAlert='closeUserAlert' @selectUserPro="selectUserPro"></UserIsSelect>
        <!-- 用户协议end -->

        <!--风控组件-->
        <risk-management v-if="is_show_risk==8" v-bind:riskData="riskData" v-on:sendmess="sendmess" v-on:closeRiskDialog="closeRiskDialog"></risk-management>
        <!--/.风控组件-->

        <!--游客登录的入口-->
        <visitor-login-entry v-if="showVisitor" v-on:closeVisitorDialog="closeVisitorDialog"></visitor-login-entry>
        <!--/.游客登录的入口-->

    </div>


</template>

<script>
    import "./index.scss";
    import "./dialog.scss";
    import riskManagement from '../../components/risk-management/risk-management';
    import PwdLogin from "../pwdLogin/pwdLogin"
    import { APIs } from '@/api/requestUrl'
    import UserProtocol from '@/components/userProtocol/userProtocol'
    import UserIsSelect from '@/components/userIsSelect/userIsSelect'
    import { getPostData } from '@/api/ghhttp.js';
    import visitorLoginEntry from '../visitor-login-entry/visitor-login-entry'
    /* eslint-disable */
    export default {
        name: "HomePage",
        data() {
            return {
                showNumber: -1,//-1显示登录首页，0表示短信登录页面，1密码登录页面
                userType: '',
                showThree: 0,
                showOther: 1,
                phone: '',
                is_show_risk: 0,   //0--表示无下一步， 8 表示下一步需要进行图形验证码,
                riskData: {
                    checkCodeGuid: '',
                    checkCodeUrl: '',
                    imagecodeType: '',
                    sdg_height: 0,
                    sdg_width: 0,
                    phone: ''
                },
                select: 1,//默认选择用户条款
                showUserPro: 0,
                showVisitor: false,
                showUserAlert:false//提醒用户勾选用户协议
            };
        },
        components: { PwdLogin, riskManagement, UserProtocol, UserIsSelect,visitorLoginEntry },
        created: function () { },
        ready() {
        },
        mounted: function () {

            this.$store.dispatch('PublicKey', () => {
                this.$store.dispatch('getAppConfigure', (data) => {
                    //获取用户配置
                    let mock = ''
                    mockData ? mock : mock = {
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
                    this.userType = mock ? mock : data;
                    if (this.userType.display_thirdaccout == 0 && this.userType.guest_enable == 0) {
                        this.showNumber = 0;
                    }
                    console.log(data);
                });
            });
        },
        methods: {
            sendmess(index) {
                let params = {
                    phone: '+86-' + this.phone,
                    supportPic: 2,
                    type: 4,
                    voiceMsg: 0
                };
                if (index) {
                    params.voiceMsg = 1;
                }
                getPostData(APIs.getRequestSmsCodeUrl(), params, (data) => {
                    console.log(data);
                    this.is_show_risk = data.nextAction;
                    this.riskData['checkCodeGuid'] = data.checkCodeGuid;
                    this.riskData['checkCodeUrl'] = data.checkCodeUrl;
                    this.riskData['imagecodeType'] = data.imagecodeType;
                    this.riskData['sdg_height'] = data.sdg_height;
                    this.riskData['sdg_width'] = data.sdg_width;
                    this.riskData['phone'] = this.phone;
                });
            },
            showThreeLogo() {
                this.showThree = 1;
                this.showOther = 0;
            },
            goToMsgLogin() {
                if(this.select == 0){
                    this.showUserAlert = 1;
                }else{
                    this.$router.push({ name: 'msgLogin', params: { userId: 123 } })
                }
                //this.showNumber = 0;
            },
            goBack() {
                switch (this.showNumber) {
                    case 0:
                        this.showNumber = -1;
                }
            },
            getSmsCode() {
                //获取短信验证码
                if (this.isPoneAvailable(this.phone)) {
                    this.sendmess();
                } else {
                    alert('请输入正确手机号');
                }
            },
            isPoneAvailable(str) {
                let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!myreg.test(str)) {
                    return false;
                } else {
                    return true;
                }
            },
            closeRiskDialog() {

                this.is_show_risk = -1;

            },
            showUserAlertClick() {
                this.showUserPro = 1;
            },
            hideUserAlert() {
              this.showUserPro = 0;
            },
            switchPwdLogin(){

              this.showNumber = 1;

            },
            switchPhoneLogin(){
              this.showNumber = 0;
              this.showUserPro = 0;
            },

            visitorLogin(){

              this.showVisitor = true;
            },

            closeVisitorDialog(){

              this.showVisitor = false;

            },
            closeUserAlert(){
                this.showUserAlert = 0;
            },
            selectUserPro(index){
                if(index == 1){
                    this.select = 1;
                    this.showUserAlert = 0;
                }else{
                    this.select = 0;
                    this.showUserAlert = 0;
                }
            }
        }
    };
</script>
