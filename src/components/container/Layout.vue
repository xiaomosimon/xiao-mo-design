<template>
  <div class="xiao-layout" :class="[ns.b(), isVertical ? ns.is('vertical') : '']">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import useNamespace from '@/hooks/useNamespace';
import {
  computed, useSlots
} from 'vue';
import type { VNode, Component } from 'vue';

const ns = useNamespace('layout');

const slots = useSlots();

const isVertical = computed(() => {
  if (slots && slots.default) {
    return slots.default().some((vn: VNode) => {
      const tag = (vn.type as Component).name;
      return tag === 'XiaoLayoutHeader' || tag === 'XiaoLayoutFooter';
    });
  }
  return false;
});
</script>
<script lang="ts">
export default {
  name: 'XiaoLayout',
};
</script>

<style lang="scss" scoped>
@import '../../styles/theme.scss';
@import '../../styles/mixin.scss';

@include b(layout) {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;

  @include is(vertical) {
    flex-direction: column;
  }
}
</style>
