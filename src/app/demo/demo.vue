<template>
    <div class="demo">
        <div class="alertdemo">
            <div class="loadinghome" v-if="showlist==1">
                <div class="title">{{title}}</div>
                <div class="inputgroup">
                    <input type="text" placeholder="请输入手机号">
                </div>
                <div class="inputgroup">
                    <input type="text" placeholder="请输入短信验证码">
                    <div class="keyword noclickColor">获取验证码</div>
                </div>
                <div class="noNumber" @click="showNumberDetail">收不到验证码？</div>
                <div class="inputgroup">
                    <button>进入游戏</button>
                </div>
                <div class="loginmess" @click="changeLogin(1)">{{titleBottom}}</div>
                <div class="close">
                    <img src="static/img/demo/close.png" alt="" @click="closeAlert">
                </div>
                <div class="back">
                    <img src="static/img/demo/back.png" alt="" @click="goHome">
                </div>
            </div>
            <div class="loadinghome" v-if="showlist==3">
                <div class="title">{{title}}</div>
                <div class="inputgroup">
                    <input type="text" placeholder="请输入手机号" v-model="phone">
                </div>
                <div class="inputgroup">
                    <input type="text" placeholder="请输入登录密码">
                    <div class="keyword" @click="resetPwd">忘记密码</div>
                </div>
                <div class="inputgroup">
                    <button>进入游戏</button>
                </div>
                <div class="loginmess" @click="changeLogin(2)">{{titleBottom}}</div>
                <div class="close">
                    <img src="static/img/demo/close.png" alt="" @click="closeAlert">
                </div>
                <div class="back">
                    <img src="static/img/demo/back.png" alt="" @click="goBack">
                </div>
            </div>
            <!-- 重置密码 -->
            <div class="loadinghome" v-if="showlist==4">
                <div class="title">重置密码</div>
                <div class="inputgroup">
                    <input type="text" placeholder="请输入手机号" v-model="phone">
                </div>
                <div class="inputgroup resetNext">
                    <button @click="nextStep(1)">下一步</button>
                </div>
                <div class="close">
                    <img src="static/img/demo/close.png" alt="" @click="closeAlert">
                </div>
                <div class="back">
                    <img src="static/img/demo/back.png" alt="" @click="goBackPwd">
                </div>
            </div>

            <!-- 重置密码验证码 -->
            <div class="loadinghome" v-if="showlist==5">
                <div class="title">重置密码</div>
                <div class="inputgroup">
                    <input type="text" placeholder="请输入手机号" v-model="phone">
                    <div class="keyword noclickColor">获取验证码</div>
                </div>
                <div class="contentPhone">
                    已发送短信至
                    <div>{{phone}}</div>
                </div>
                <div class="inputgroup">
                    <button>下一步</button>
                </div>
                <div class="close">
                    <img src="static/img/demo/close.png" alt="" @click="closeAlert">
                </div>
                <div class="back">
                    <img src="static/img/demo/back.png" alt="" @click="goBackPwd">
                </div>
            </div>
        </div>

        <div class="show3 backAlert" v-if="showNumber">
            <div class="showimg numberStyle">
                <img src="static/img/demo/number.png" alt="">
                <div class="close">
                    <img src="static/img/demo/close.png" alt="" @click="closeAlert">
                </div>
            </div>
        </div>
        <div class="show3" v-if="showlist==2">
            <div class="showimg">
                <img src="static/img/demo/demo1.png" alt="">
                <button class="login" @click="goLogin"></button>
                <button class="login user" @click="goUserLogin"></button>
                <div class="readSelect">
                    <input type="checkbox" name="select" id="" v-model="select" value="select">
                    <span @click="read">我同意服务条款及隐私政策</span>
                </div>
                <div class="close">
                    <img src="static/img/demo/close.png" alt="" @click="closeAlert">
                </div>
            </div>
        </div>
        <div class="show3 alert" v-if="userread==1">
            <div class="showimg readlist">
                <div class="title">
                    用户协议
                </div>
                <div class="content">
                    用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议用户协议
                </div>
                <div class="close">
                    <img src="static/img/demo/close.png" alt="" @click="closeAlert">
                </div>
            </div>
        </div>
        <div class="show3 alert" v-if="unserLogin">
            <div class="showimg readlist userLogin">
                <div class="userAlertContent">
                    当前为游客账号，为了您游戏便捷及账号安全，请尽快绑定为正式游戏账号
                </div>
                <div class="close">
                    <img src="static/img/demo/close.png" alt="" @click="closeUserAlert">
                </div>
                <div class="buttonStyle">
                    <button>进入游戏</button>
                    <button>立即绑定</button>
                </div>
            </div>
        </div>
        <div class="show3 alert selectAlert" v-if="noSelect==1">
            <div class="showimg readlist">
                <img src="static/img/demo/select.png" alt="" class="closeStyle">
                <div class="close">
                    <img src="static/img/demo/close.png" alt="" @click="closeselectAlert">
                </div>
                <div class="selectBtn" @click="selectAlert"></div>
                <div class="reject" @click="closeselectAlert"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import "./demo.scss";
    /* eslint-disable */
    export default {
        name: "Demo",
        data() {
            return {
                showlist: 2,
                userread: 0,
                select: 1,
                noSelect: 0,
                title: '短信登录',
                titleBottom: '账号登录',
                phone: '',
                unserLogin: 0,
                showNumber: 0
            };
        },
        created: function () { },
        ready() {
        },
        mounted: function () {

        },
        methods: {
            goLogin() {
                if (this.select == 1) {
                    this.showlist = 1;
                } else {
                    this.noSelect = 1;
                }
            },
            goUserLogin() {
                if (this.select == 1) {
                    this.unserLogin = 1;
                } else {
                    this.noSelect = 1;
                }
            },
            closeUserAlert() {
                this.unserLogin = 0;
            },
            read() {
                this.userread = 1;
            },
            closeAlert() {
                this.userread = 0;
                this.showNumber = 0;
            },
            closeselectAlert() {
                this.noSelect = 0;
            },
            selectAlert() {
                this.noSelect = 0;
                this.select = 1;
            },
            changeLogin(index) {
                if (index == 1) {
                    this.title = '账号登录';
                    this.titleBottom = '短信登录';
                    this.showlist = 3;
                } else {
                    this.title = '短信登录';
                    this.titleBottom = '账号登录';
                    this.showlist = 1;
                }
            },
            goHome() {
                this.showlist = 2;
            },
            goBack() {
                this.title = '短信登录';
                this.titleBottom = '账号登录';
                this.showlist = 1;
            },
            goBackPwd() {
                this.title = '账号登录';
                this.titleBottom = '短信登录';
                this.showlist = 3;
            },
            resetPwd() {
                this.showlist = 4;
            },
            nextStep(index) {
                if (index == 1) {
                    this.showlist = 5;
                }
            },
            showNumberDetail() {
                //显示语音验证码
                this.showNumber = 1;
            }
        }
    };
</script>
<style lang="scss">
body{
    background-color:#000;
    font-size:30px;
}
</style>