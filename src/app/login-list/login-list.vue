<template>
    <div class="index_wrap PwdLogin">
      <div class="index_main" >
        <div class="header_bar">
          <a class="back">
            <i class="icon_back" @click="goBack"></i>
          </a>
          <a class="close">
            <i class="icon_close" @click="closeAlert"></i>
          </a>
        </div>
        <div class="pwdLogin">
          <div class="login_form">
            <h3>账号登录</h3>
            <div class="login-list">
              <ul class="account-ul">
                <li>
                  <p>请选择您要登录的账号</p>
                </li>
                <li>
                  <p>请选择您要登录的账号</p>
                </li>
                <li>
                  <p>请选择您要登录的账号</p>
                </li>
                <li>
                  <p>请选择您要登录的账号</p>
                </li>
                <li>
                  <p>请选择您要登录的账号</p>
                </li>
              </ul>
            </div>
            <div class="btns">
              <a class="btn" @click="gotoLogin()" >进入游戏</a>
            </div>
            <div class="bottom_box">
              <a class="link" @click="switchPhoneLogin()">其他账号登录</a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login-list",
        data(){
          return{
            showApp: 1
          }
        },
        methods: {

          goBack(){

          },

          closeAlert(){

          },

          gotoLogin(){


          },

        }
    }
</script>

<style scoped>

</style>
