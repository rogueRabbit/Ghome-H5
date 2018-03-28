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
                    <span>《服务条款及隐私政策》</span>
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
            close(){}
        }
    };
</script>