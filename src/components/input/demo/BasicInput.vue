<template>
  <span>{{username}}</span>
  <xiao-input v-model="username"></xiao-input>
</template>
<script lang="ts">
import XiaoInput from '../Input.vue';
export default {
  components: {
    XiaoInput
  },
  data() {
    return {
      username: ''
    };
  }
};
</script>
