<template>
    <div class="mint-toast myLoading loadingToast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px' : '0px' }">
      <div class="bg"></div>
      <i class="mint-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <div class="loading"></div>
      <!-- <span class="mint-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '6px' }">{{ message }}</span> -->
    </div>
</template>


<script type="text/babel">
import './loading.scss'
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        visible: false
      };
    },
    computed: {
      customClass() {
        var classes = [];
        switch (this.position) {
          case 'top':
            classes.push('is-placetop');
            break;
          case 'bottom':
            classes.push('is-placebottom');
            break;
          default:
            classes.push('is-placemiddle');
        }
        classes.push(this.className);
        return classes.join(' ');
      }
    }
  };
</script>