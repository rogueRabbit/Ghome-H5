<template>
    <div></div>
</template>

<script>
    import "./index.scss";
    /* eslint-disable */
    export default {
        name: "HomePage",
        data() {
            return {
                msg: "Welcome to Your Vue.js App",
                scrolled: false,
                skPlayer1: ""
            };
        },
        created: function () { },
        ready() {
        },
        mounted: function () {
            this.$store.dispatch('PublicKey');
            this.$store.dispatch('getPhonemsAction');
            /* this.$http({
                method: 'post',
                url: 'http://www.baidu.com',
                data: {
                    name: 'xiaoming',
                    info: '12'
                }
            }).catch((err)=>{
                console.log(err);
            }); */
        },
        methods: {
        }
    };
</script>