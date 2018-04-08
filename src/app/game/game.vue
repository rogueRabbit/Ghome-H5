<template>
    <div class="demo">
        恭喜您，成功登录游戏，开始您的游戏之旅吧！
    </div>
</template>

<script>
    import "./demo.scss";
    import { APIs } from '@/api/requestUrl'
    import { getPostData } from '@/api/ghhttp.js'
    import Loading from '@/components/loading/'
    /* eslint-disable */
    export default {
        name: "Game",
        data() {
            return {

            };
        },
        created: function () { },
        ready() {
        },
        mounted: function () {

        },
        methods: {

        }
    };
</script>
