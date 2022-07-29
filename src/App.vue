<template>
  <xiao-layout>
    <xiao-layout-aside></xiao-layout-aside>
    <xiao-layout>
      <xiao-layout-header></xiao-layout-header>
      <xiao-layout-content>
        <basic-form />
        <xiao-button @click="openNotification">通知</xiao-button>
      </xiao-layout-content>
    </xiao-layout>
  </xiao-layout>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import BasicForm from './components/form/demo/BasicForm.vue';
import { XiaoNotification } from './components/notification';
const num = ref(1);

function openNotification() {
  XiaoNotification.success({
    title: '编号：' + num.value,
    message: '<div>1231</div>',
    duration: 0,
    showClose: true,
  });
  num.value++;
}

</script>