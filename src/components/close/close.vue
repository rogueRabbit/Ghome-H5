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
                    是否确认退出登录
                </div>
                <div class="btnStyle">
                    <button class="clickStyle left" @click="selectUserPro(1)">取消</button>
                    <button class="clickStyle right"  @click="selectUserPro(0)">确认退出</button>
                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import "./close.scss";
    /* eslint-disable */
    export default {
        name: "Close",
        data() {
            return {
                userContent: ''
            };
        },
        created: function () { },
        ready() {
        },
        mounted: function () {

        },
        methods: {
            close(){
                this.$emit('closeBtn');
            },
            selectUserPro(index){
                if(index == 1){
                    this.$emit('closeBtn',1);
                }else{
                    this.$emit('closeClick',0);
                }
            }
        }
    };
</script>