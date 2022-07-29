<template>
  <header :class="ns.b()">
    <slot />
  </header>
</template>
<script lang="ts" setup>
import useNamespace from '@/hooks/useNamespace';

const ns = useNamespace('layout-header');
</script>
<script lang="ts">
export default {
  name: 'XiaoLayoutHeader',
};
</script>
<style lang="scss" scoped>
@import '../../styles/theme.scss';
@import '../../styles/mixin.scss';

@include b(layout-header) {
  padding: $--header-padding;
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
