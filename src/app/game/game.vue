<template>
    <div class="demo">
        111
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
           
            Loading(
                {
                    message: '图片格式不支持',
                    duration: 10000
                }
            );
        },
        methods: {
            
        }
    };
</script>