<template>
    <div class="game">
        <span class="selectA">选择区服：</span>
        <select v-model="selected">
            <option v-for="item in areaList" v-bind:value="item.name">
                {{ item.name }}
            </option>
        </select>
        <br />
        <div class="userDetail">
            userId:<input type="text" :value="selectUserId" disabled><br>
            ticket:<input type="text" :value="ticket" disabled>
        </div>
        恭喜您，成功登录游戏，开始您的游戏之旅吧！
        <button class="getticket" @click="getTick">获取ticket</button>
        <!-- <button class="getticket">支付</button>
        <button class="getticket">切换账号</button>
        <button class="getticket">游客升级</button> -->
    </div>
</template>

<script>
    import "./demo.scss";
    import { APIs } from '@/api/requestUrl'
    import { getPostData, getPostDataNo3DES } from '@/api/ghhttp.js'
    import Loading from '@/components/loading/'
    import { getLocalStorage, setLocalStorage, getSessionStorage, setSessionStorage, isPoneAvailable } from '../../utils/Tools';
    /* eslint-disable */
    export default {
        name: "Game",
        data() {
            return {
                userList: [],
                areaList: [],
                selected: '',
                selectAreaId: '',
                selectUserId:'',
                ticket:''
            };
        },
        created: function () { },
        ready() {
        },
        mounted: function () {
            let loginList = JSON.parse(getSessionStorage('gameUserList'));
            this.userList = loginList;
            console.log(loginList);
            this.selectUserId = this.userList[this.userList.length - 1].userid
            setTimeout(() => {
                getPostDataNo3DES(APIs.getAreaConfigurationUrl(), {}, (data) => {
                    this.areaList = data.message;
                });
            }, 10);
        },
        updated: function () {
            this.areaList.map((item, index) => {
                if (this.selected == item.name) {
                    this.selectAreaId = item.area_code;
                }
            });
        },
        methods: {
            getTick() {
                console.log(this.userList[this.userList.length - 1]);
                if (this.selectAreaId != '') {
                    let params = {
                        appid: this.userList[this.userList.length - 1].userid,
                        areaid:this.selectAreaId,
                        group: 'game',
                        seq: 1
                    };
                    getPostData(APIs.getTicketUrl(), params, (data) => {
                        this.ticket = data.ticket;
                        console.log(data);
                    });
                }else{
                    alert('请选择区服');
                }
            }
        }
    };
</script>