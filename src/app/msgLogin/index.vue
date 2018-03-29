<template>
    <div class="index_wrap">
        <div class="index_main" v-if="!showArea">
            <div class="header_bar">
                <a class="back">
                    <i class="icon_back" @click="goBack"></i>
                </a>
                <a class="close">
                    <i class="icon_close"></i>
                </a>
            </div>

            <!-- 短信登录 -->
            <div class="login_form" v-if="showNumber==0">
                <h3>短信登录</h3>
                <div class="item">
                    <label class="country" @click="changeArea">{{areaCode}}
                        <span class="down"></span>
                    </label>
                    <input type="text" placeholder="请输入手机号码" class="phone" v-model="phone" autocomplete="off">
                </div>
                <div class="item">
                    <input type="text" placeholder="请输入短信验证码" v-model="msgCode">
                    <span class="get_yzm" @click="getSmsCode">获取验证码</span>
                </div>
                <p class="no_yzm">收不到验证码?</p>
                <div class="btns">
                    <a class="btn" :disabled="hasInput == 1" @click="smgLogin"  :class="hasInput?'':'disabledClick'">进入游戏</a>
                </div>
                <div class="bottom_box">
                    <a class="link" @click="gotoPwdLogin">密码登录</a>
                </div>
            </div>
        </div>
        <div class="index_main area_code" v-if="showArea">
            <div class="header_bar">
                <a class="close">
                    <i class="icon_close" @click="closeAreaSelect"></i>
                </a>
            </div>
            <div class="title">手机归属地</div>
            <div class="content">
                <div class="showList" v-for="(word,key) in wordList" :key="key">
                    <div class="listWord" v-if="getCountryList(word)">
                        <h3 class="conuntryTitle">{{word}}</h3>
                        <ul class="country-wrap">
                            <li v-for="(item,key) in countryList" :key="key" @click="onSelect(item.flag,item.text)" class="showCountryList" v-if="item.word==word">
                                {{item.text}}<span>{{item.flag}}</span>
                                <i class="icon_check_on"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!--风控组件-->
        <risk-management v-if="is_show_risk==8" v-bind:riskData="riskData" v-on:sendmess="sendmess" v-on:closeRiskDialog="closeRiskDialog"></risk-management>
        <!--/.风控组件-->

        <!--语音验证码-->
        <voice-code v-if="showVoice" v-on:closeVoiceDialog="closeVoiceDialog"></voice-code>
        <!--/.语音验证码-->

    </div>


</template>

<script>
    import riskManagement from '../../components/risk-management/risk-management';
    import PwdLogin from "../pwdLogin/pwdLogin"
    import { APIs } from '@/api/requestUrl'
    import { getPostData } from '@/api/ghhttp.js';
    import voiceCode from '../../components/voice-code/voice-code';
    import { country } from './country.js'
    /* eslint-disable */
    export default {
        name: "MsgLogin",
        data() {
            return {
                showNumber: 0,//-1显示登录首页，0表示短信登录页面，1密码登录页面
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
                    phone: '',
                    areaCode: '+86',
                    msgCode:''
                },
                msgCode:'',
              select:1,//默认选择用户条款
              showUserPro:0,
              showVoice: false,  //是否显示语音验证码的风控,
              areaCode: '+86',
              showArea: 0,
              countryList: country(),
              wordList: [
                '常用', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
                'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U',
                'V', 'W', 'X', 'Y', 'Z'
              ],
              hasInput:0, //进入游戏按钮是否disable,
              pageSource: '',  //页面跳转来源，游客升级也需要走登录流程，当pageSource='visitor-login'表明是从游客登录页面跳转过来的
            };
        },
        components: { PwdLogin ,riskManagement, voiceCode},
        created: function () { },
        ready() {
        },
        mounted: function () {

          this.pageSource = this.$route.query.pageSource;


        },
        watch:{
            msgCode(newV,oldV){
                if(newV != ''&&this.phone != ''){
                    this.hasInput = 1;
                }else{
                    this.hasInput = 0;
                }
                this.riskData['msgCode'] = newV;
            },
            phone(newV,oldV){
                if(newV != ''&&this.msgCode != ''){
                    this.hasInput = 1;
                }else{
                    this.hasInput = 0;
                }
                this.riskData['phone'] = newV;
            }
        },
        methods: {
            gotoPwdLogin() {
                this.$router.push({ name: 'pwdLogin', params: {} })
            },
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
                    this.riskData['areaCode'] = this.areaCode;
                    console.log('-data.checkCodeUrl--'+data.checkCodeUrl);
                    console.log('-data.sdg_height--'+data.sdg_height);
                    console.log('-data.sdg_width--'+data.sdg_width);
                });
            },
            showThreeLogo() {
                this.showThree = 1;
                this.showOther = 0;
            },
            goToMsgLogin() {
                this.showNumber = 0;
            },
            goBack() {
                switch (this.showNumber) {
                    case 0:
                        this.$router.push({ name: 'HomePage', params: {} })
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
            showUserAlert() {
                this.showUserPro = 1;
            },
            hideUserAlert() {
              this.showUserPro = 0;
            },
            closeVoiceDialog(){

              this.showVoice = false;

            },
            changeArea() {
                this.showArea = 1;
            },
            getCountryList(word) {
                let selectList = this.countryList.filter(item => item.word === word)
                if (selectList.length > 0) {
                    return 1
                } else {
                    return 0
                }
            },
            onSelect(flag,text){
                this.areaCode = flag;
                this.showArea = 0;
            },
            closeAreaSelect(){
                this.showArea = 0;
            },
            smgLogin(){
                //登录游戏
                if(this.hasInput == 1){
                    alert('登录游戏');
                }
            }
        }
    };
</script>
