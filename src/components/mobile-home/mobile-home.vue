<template>
  <div class="index_wrap PwdLogin">
    <div class="index_main area_code">
      <div class="header_bar">
        <a class="close">
          <i class="icon_close" @click="closeAreaSelect"></i>
        </a>
      </div>
      <div class="title">手机归属地</div>
      <div class="content">
        <div class="showList" v-for="(word,key) in wordList" :key="key">
          <div class="listWord" v-if="getCountryList(word)">
            <h3 class="conuntryTitle">{{word}}</h3>
            <ul class="country-wrap">
              <li v-for="(item,key) in countryList" :key="key" @click="onSelect(item.flag,item.text)" class="showCountryList" v-if="item.word==word">
                {{item.text}}
                <span>{{item.flag}}</span>
                <i class="icon_check_on"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { country } from './country.js'
  export default {
        name: "mobile-home",
        data(){
          return {
            countryList: country(),
            wordList: [
              '常用', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
              'H', 'I', 'J', 'K', 'L', 'M', 'N',
              'O', 'P', 'Q', 'R', 'S', 'T', 'U',
              'V', 'W', 'X', 'Y', 'Z'
            ],
            areaCode: '+86',
          }
        },
        methods: {

          getCountryList(word) {
            let selectList = this.countryList.filter(item => item.word === word)
            if (selectList.length > 0) {
              return 1
            } else {
              return 0
            }
          },

          onSelect(flag, text) {

            this.areaCode = flag;
            this.$emit('closeMobileHome', this.areaCode);

          },

          closeAreaSelect() {

            this.$emit('closeMobileHome', -1);

          },

        }
    }
</script>

<style scoped>

</style>
