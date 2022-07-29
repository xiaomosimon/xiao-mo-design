<template>
  <div :class="ns.b()">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import useNamespace from '@/hooks/useNamespace';

const ns = useNamespace('layout-aside');
</script>
<script lang="ts">
export default {
  name: 'XiaoLayoutAside',
};
</script>
<style lang="scss" scoped>
@import '../../styles/theme.scss';
@import '../../styles/mixin.scss';

@include b(layout-aside) {
  box-sizing: border-box;
  flex-shrink: 0;
}
</style>
