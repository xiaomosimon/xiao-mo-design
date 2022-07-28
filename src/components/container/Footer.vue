<template>
  <footer class="xiao-layout-footer">
    <slot />
  </footer>
</template>
<script lang="ts" setup>
</script>
<script lang="ts">
export default {
  name: 'XiaoLayoutFooter',
};
</script>
<style lang="scss" scoped>
@import '../../styles/theme.scss';
@import '../../styles/mixin.scss';

@include b(layout-footer) {
  padding: $--footer-padding;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
