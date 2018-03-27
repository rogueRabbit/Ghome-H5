<template>
    <div class="index_wrap">
        <div class="index_main">
            <div class="header_bar">
                <a class="back"><i class="icon_back"></i></a>
                <a class="close"><i class="icon_close"></i></a>
            </div>
            <div class="index_act" style="display:none;">
                <div class="logo"></div>
                <div class="btns">
                    <a class="btn">账号登录</a>
                    <a class="btn btn_border">游客登录</a>
                </div>
            </div> 
            
            <div class="login_form">
                <h3>短信登录</h3>
                <div class="item">
                    <label class="country">+86</label>
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
            </div>
            
            
           
            <ul class="third_type">
                <li class="cur">
                    <i class="dy"></i><p>叨鱼</p>
                </li>
                <li>
                    <i class="wb"></i><p>微博</p>
                </li>
                <li>
                    <i class="wx"></i><p>微信</p>
                </li>
            </ul>
            <div class="other_type"></div>
            <div class="ser_box">
                <input type="checkbox"><b></b>我同意服务条款及隐私政策
            </div>
        </div>
        
    </div>
    
</template>

<script>
    import "./index.scss";
    /* eslint-disable */
    export default {
        name: "HomePage",
        data() {
            return {
            };
        },
        created: function () { },
        ready() {
        },
        mounted: function () {
            if (this.$store.state.token == '') {
                this.$store.dispatch('PublicKey',()=>{
                    this.$store.dispatch('getAppConfigure',(data)=>{
                        //获取用户配置
                        console.log(data);
                    });
                });
            }
        },
        methods: {
            sendmess() {
                if (this.$store.state.token != '') {
                    this.$store.dispatch('getPhonemsAction',(data)=>{
                        console.log(data);
                    });
                }
            }
        }
    };
</script>