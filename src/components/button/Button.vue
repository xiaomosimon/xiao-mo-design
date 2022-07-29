<template>
  <button :class="[ns.b(), className]">
    <slot />
  </button>
</template>
<script lang="ts" setup>
import useNamespace from '@/hooks/useNamespace';
import { withDefaults, computed } from 'vue';

const ns = useNamespace('button');

interface Props {
  type?: 'default' | 'primary' | 'danger' | 'warning',
  size?: 'middle' | 'large' | 'small',
  shape?: 'default' | 'circle' | 'round'
}

const props = withDefaults(defineProps<Props>(), { type: 'default', size: 'middle', shape: 'default' });

const className = computed(() => {
  const classList = [];
  if (props.type !== 'default') {
    classList.push(ns.m(props.type));
  }
  if (props.size !== 'middle') {
    classList.push(ns.m(props.size));
  }
  if (props.shape !== 'default') {
    classList.push(ns.m(props.shape));
  }
  return classList;
});

</script>
<script lang="ts">
export default {
  name: 'XiaoButton',
};
</script>

<style lang="scss" scoped>
@import '../../styles/theme.scss';
@import './button.scss';

@include b(button) {
  display: inline-block;
  box-sizing: border-box;
  border-radius: 4px;
  margin: 0;
  padding: 0 15px;
  height: 32px;
  line-height: 1.499;
  font-size: $--font-size-base;
  user-select: none;
  cursor: pointer;
  transition: border-color .8s, color .8s, background-color .8s;
  @include button-type($--border-color-base, white, $--heading-color, $--primary-color, white, $--primary-color);

  @include m(primary) {
    @include button-type($--primary-color, $--primary-color, white, $--primary-color, $--primary-color-hover, white);
  }

  @include m(danger) {
    @include button-type($--error-color, white, $--error-color, $--error-color-hover, white, $--error-color-hover);

  }

  @include m(warning) {
    @include button-type($--warning-color, white, $--warning-color, $--warning-color-hover, white, $--warning-color-hover);
  }

  @include m(large) {
    @include button-size(40px, 6.4px 15px, 16px);
  }

  @include m(small) {
    @include button-size(24px, 0 7px, 14px);
  }

  @include m(round) {
    @include button-shape(round);
  }

  @include m(circle) {
    @include button-shape(circle);
  }

  +.xiao-button {
    margin-left: 10px;
  }
}
</style>
