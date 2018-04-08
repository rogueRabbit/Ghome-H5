<template>
    <div class="userIsSelect">
        <div class="contentShow">
            <div class="index_main">
                <div class="header_bar">
                    <a class="close">
                        <i class="icon_close" @click="close"></i>
                    </a>
                </div>
                <div class="content">
                    进入游戏前，请先阅读并同意：
                    <br>
                    <span @click="showUserDetail">《服务条款及隐私政策》</span>
                </div>
                <div class="btnStyle">
                    <button class="clickStyle left" @click="selectUserPro(1)">立即勾选</button>
                    <button class="clickStyle right"  @click="selectUserPro(0)">残忍拒绝</button>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import "./userIsSelect.scss";
    /* eslint-disable */
    export default {
        name: "UserIsSelect",
        data() {
            return {
                userContent: '用户协议用户服务协议用户服务协议用户服务协议用户服务协议用户服务协议'
            };
        },
        created: function () { },
        ready() {
        },
        mounted: function () {

        },
        methods: {
            close(){
                this.$emit('closeUserAlert');
            },
            selectUserPro(index){
                if(index == 1){
                    this.$emit('selectUserPro',1);
                }else{
                    this.$emit('selectUserPro',0);
                }
            },
            showUserDetail(){
                this.$emit('showUserAlertClick');
            }
        }
    };
</script>