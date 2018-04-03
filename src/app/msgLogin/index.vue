<template>
    <div class="index_wrap" v-if="showApp">
        <div class="index_main" v-if="!showArea">
            <div class="header_bar">
                <a class="back">
                    <i class="icon_back" @click="goBack"></i>
                </a>
                <a class="close">
                    <i class="icon_close" @click="closeAlert"></i>
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
                    <span class="get_yzm" @click="getSmsCode" v-if="!showTime">获取验证码</span>
                    <span class="get_yzm" v-if="showTime">{{timeNumber}}'</span>
                </div>
                <p class="no_yzm" @click="sendVoiceCode">收不到验证码?</p>
                <div class="btns">
                    <a class="btn" :disabled="hasInput == 1" @click="smgLogin" :class="hasInput?'':'disabledClick'">进入游戏</a>
                </div>
                <div class="bottom_box">
                    <a class="link" @click="gotoPwdLogin">密码登录</a>
                </div>
            </div>
        </div>
        <!--风控组件-->
        <risk-management v-if="is_show_risk==8" v-bind:riskData="riskData" v-on:sendmess="sendmess" v-on:closeRiskDialog="closeRiskDialog"></risk-management>
        <!--/.风控组件-->

        <!--语音验证码-->
        <voice-code v-if="showVoice" v-bind:areaCode="areaCode" v-bind:phone="phone" v-on:closeVoiceDialog="closeVoiceDialog" v-on:showRiskDialog="showRiskDialog"></voice-code>
        <!--/.语音验证码-->
        <Close @closeClick="closeLogin" v-if="showCloseStatus" @closeBtn="closeBtn"></Close>

        <!--国家区号-->
        <mobile-home v-show="show_mobile_home" v-on:closeMobileHome="closeMobileHome" :areaCodeTest="areaCode"></mobile-home>
        <!--/.国家区号-->
    </div>
</template>

<script>
    import riskManagement from '../../components/risk-management/risk-management';
    import PwdLogin from "../pwdLogin/pwdLogin"
    import { APIs } from '@/api/requestUrl'
    import { getPostData } from '@/api/ghhttp.js';
    import voiceCode from '../../components/voice-code/voice-code';
    import { country } from './country.js'
    import Close from '@/components/close/close';
    import { getLocalStorage, setLocalStorage } from '../../utils/Tools';
    import mobileHome from '@/components/mobile-home/mobile-home';
    import Toast from '../../components/toast';
    import Loading from '@/components/loading/'
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
                    msgCode: ''
                },
                msgCode: '',
                select: 1,//默认选择用户条款
                showUserPro: 0,
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
                hasInput: 0,//进入游戏按钮是否disable
                timeNumber: 60,//倒计时
                showTime: 0,
                countTime: '',
                isGuestLogin: 0,
                showApp: 1,
                showCloseStatus: 0,
                show_mobile_home: 0
            };
        },
        components: { PwdLogin, riskManagement, voiceCode, Close, mobileHome },
        created: function () { },
        ready() {
        },
        mounted: function () {
            if (this.$route.query.pageSource) {
                //游客进入登录
                this.isGuestLogin = 1;
            }

            if (getLocalStorage('phone') != null) {
                this.phone = getLocalStorage('phone');
            }

            if (getLocalStorage('areaCode') != null) {
                this.areaCode = getLocalStorage('areaCode');
            }

        },
        watch: {
            msgCode(newV, oldV) {
                if (newV != '' && this.phone != '') {
                    this.hasInput = 1;
                } else {
                    this.hasInput = 0;
                }
                this.riskData['msgCode'] = newV;
            },
            phone(newV, oldV) {
                if (newV != '' && this.msgCode != '') {
                    this.hasInput = 1;
                } else {
                    this.hasInput = 0;
                }
                setLocalStorage('phone', newV);
                this.riskData['phone'] = newV;

            },
            areaCode(newV) {
                this.riskData['areaCode'] = newV;

            },
            timeNumber(newV) {
                if (newV == 0) {
                    this.timeNumber = '';
                    this.showTime = 0;
                }
            }
        },
        methods: {
            closeMobileHome(data) {

                this.show_mobile_home = false;
                if (data != -1) {
                    this.areaCode = data;
                }
            },
            gotoPwdLogin() {
                if (this.isGuestLogin == 1) {
                    this.$router.push({
                        name: 'pwdLogin', query: {
                            guestData: this.$route.query.guestData,
                            pageSource: this.$route.query.pageSource
                        }
                    });
                } else {
                    this.$router.push({ name: 'pwdLogin', query: {} });
                }
            },
            sendmess(index) {
                let params = {
                    phone: this.areaCode + this.phone,
                    sms_new: 1,
                    supportPic: 2,
                    type: 4,
                    voiceMsg: 0
                };
                if (index) {
                    params.voiceMsg = 1;
                }
                let loadingTest = Loading(
                    {
                        message: '',
                        duration: 10
                    }
                );
                getPostData(APIs.getRequestSmsCodeUrl(), params, (data, resCode) => {
                    loadingTest.close();
                    if (resCode == 0) {
                        if (data.nextAction != 8) {
                            this.timeNumber = 60;
                            this.showTime = 1;
                            this.showTimeCount();
                        }
                        this.is_show_risk = data.nextAction;
                        this.riskData['checkCodeGuid'] = data.checkCodeGuid;
                        this.riskData['checkCodeUrl'] = data.checkCodeUrl;
                        this.riskData['imagecodeType'] = data.imagecodeType;
                        this.riskData['sdg_height'] = data.sdg_height;
                        this.riskData['sdg_width'] = data.sdg_width;
                        this.riskData['phone'] = this.phone;
                        this.riskData['areaCode'] = this.areaCode;
                    }
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
                    setLocalStorage('phone', this.phone);
                    setLocalStorage('areaCode', this.areaCode);
                } else {
                    Toast({
                        message: '请输入正确手机号码',
                        duration: 3000
                    })
                }
            },
            showTimeCount() {
                this.timeNumber--;
                if (this.timeNumber > 0) {
                    setTimeout(this.showTimeCount, 1000);
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
            //关闭风控验证码的弹框及后续操作
            closeRiskDialog(type) {

                this.is_show_risk = -1;
                if (type == 0) {//登录时，手机号码被风控的情况，关闭弹框，并开始倒计时
                    this.timeNumber = 60;
                    this.showTime = 1;
                    this.showTimeCount();
                }

            },
            showUserAlert() {
                this.showUserPro = 1;
            },
            hideUserAlert() {
                this.showUserPro = 0;
            },
            closeVoiceDialog() {

                this.showVoice = false;

            },
            changeArea() {
                this.show_mobile_home = 1;
            },
            getCountryList(word) {
                let selectList = this.countryList.filter(item => item.word === word)
                if (selectList.length > 0) {
                    return 1
                } else {
                    return 0
                }
            },
            onSelect(flag, text) {
                this.areaCode = flag;
                this.showArea = 0;
            },
            closeAreaSelect() {
                this.showArea = 0;
            },
            smgLogin() {
                let params = {
                    deviceid: window.deviceid,
                    group: 'game',
                    phone: this.areaCode + '-' + this.phone,
                    sms_new: 1,
                    sms_type: 4,
                    smscode: this.msgCode,
                };
                //登录游戏
                if (this.hasInput == 1 && this.isPoneAvailable(this.phone)) {
                    setLocalStorage('phone', this.phone);
                    if (this.isGuestLogin == 1) {
                        //游客掉该接口登录，接口不一样
                        getPostData(APIs.smsAuth(), params, (data1) => {
                            let resData = data1;
                            this.$router.push({
                                name: 'visitorUpgrade', query: {
                                    userid: resData.userid,
                                    deviceid: params.deviceid,
                                    phone: params.phone,
                                    userData: JSON.stringify(resData),
                                    guestData: this.$route.query.guestData
                                }
                            });
                        })
                    } else {
                        //正常用户登录流程
                        getPostData(APIs.smsLogin(), params, (data) => {
                            let resData = data;
                            //测试用start
                            /* resData.hasExtendAccs = 0;
                            resData.realInfo_status = 1 */
                            //测试数据结束end
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
                                        }
                                    }
                                }
                            }
                        });
                    }
                } else {
                    // alert('手机格式不正确');
                    Toast({
                        message: '手机号码格式不正确',
                        duration: 3000
                    })
                }
            },
            sendVoiceCode() {

                if (this.isPoneAvailable(this.phone)) {
                    this.showVoice = true;
                } else {
                    Toast({
                        message: '请输入正确手机号码',
                        duration: 3000
                    })
                }
            },
            //语音验证码中需要出现风控的情况
            showRiskDialog(fromChildData) {

                this.riskData = fromChildData;
                this.is_show_risk = 8;


            },
            closeLogin() {
                this.showApp = 0;
                this.showCloseStatus = 0;
            },
            closeAlert() {
                this.showCloseStatus = 1;
            },
            closeBtn() {
                this.showCloseStatus = 0;
            }

        }
    };
</script>