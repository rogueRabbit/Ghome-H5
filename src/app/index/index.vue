<template>
    <div>
        <button @click='sendmess'>获取验证码</button>
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
