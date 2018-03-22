<template>
    <div>
        <button @click='sendmess'></button>
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
            console.log(this.$store.state.token);
            if (this.$store.state.token == '') {
                this.$store.dispatch('PublicKey');
            }
            //this.$store.dispatch('getPhonemsAction');
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
            sendmess() {
                if (this.$store.state.token != '') {
                    this.$store.dispatch('getPhonemsAction');
                }
            }
        }
    };
</script>