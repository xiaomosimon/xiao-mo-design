<template>
  <footer :class="ns.b()">
    <slot />
  </footer>
</template>
<script lang="ts" setup>
import useNamespace from '@/hooks/useNamespace';

const ns = useNamespace('layout-footer');
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
