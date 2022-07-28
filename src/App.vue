<template>
  <xiao-layout>
    <xiao-layout-aside></xiao-layout-aside>
    <xiao-layout>
      <xiao-layout-header></xiao-layout-header>
      <xiao-layout-content>
        <basic-form />
      </xiao-layout-content>
    </xiao-layout>
  </xiao-layout>
</template>
<script lang="ts">
import BasicForm from './components/form/demo/BasicForm.vue';
export default {
  components: {
    BasicForm
  }
};
</script>