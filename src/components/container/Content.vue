<template>
  <main :class="ns.b()">
    <slot />
  </main>
</template>
<script lang="ts" setup>
import useNamespace from '@/hooks/useNamespace';

const ns = useNamespace('layout-content');
</script>
<script lang="ts">
export default {
  name: 'XiaoLayoutContent',
};
</script>
<style lang="scss" scoped>
@import '../../styles/theme.scss';
@import '../../styles/mixin.scss';

@include b(layout-content) {
  padding: $--content-padding;
  box-sizing: border-box;
  flex-shrink: 1;
}
</style>
