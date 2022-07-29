<template>
  <transition :name="ns.e('fade')" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div v-show="visible" :id="id" :class="[ns.b(), typeClass]" :style="positionStyle" :key="id">
      <div :class="ns.e('header')">
        <p :class="ns.e('title')">{{ title }}</p>
        <span v-show="showClose" :class="ns.e('close')" @click.stop="close">×</span>
      </div>
      <div :class="ns.e('body')">
        <slot>
          <p v-html="message"></p>
        </slot>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import useNamespace from '@/hooks/useNamespace';
import { ref, computed, onMounted } from 'vue';
import { notificationProps } from './type';
import type { CSSProperties } from 'vue';
const ns = useNamespace('notification');

const visible = ref(false);

const props = defineProps(notificationProps);

const typeClass = computed(() => props.type !== 'info' ? ns.m(props.type) : '');

const positionStyle = computed<CSSProperties>(() => {
  return {
    right: '20px',
    zIndex: props.zIndex,
    top: props.offset + 'px',
  };
});

function close() {
  visible.value = false;
}

function startTimer() {
  if (props.duration > 0) {
    setTimeout(() => {
      visible.value && close();
    }, props.duration);
  }
}

onMounted(() => {
  startTimer();
  visible.value = true;
});

defineExpose({
  visible,

  close,
  startTimer
});
</script>
<script lang="ts">
export default {
  name: 'XiaoNotification'
};
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';
@import '../../styles/theme.scss';

@include b(notification) {
  position: fixed;
  right: 20px;
  z-index: 999;
  box-shadow: $--el-box-shadow-light;
  border-radius: 8px;
  width: 330px;

  @include m(success) {
    @include e(title) {
      color: $--success-color;
    }
  }

  @include m(warning) {
    @include e(title) {
      color: $--warning-color;
    }
  }

  @include m(error) {
    @include e(title) {
      color: $--error-color;
    }
  }

  @include e(fade-enter-from) {
    transform: translateX(400px);
  }

  @include e(fade-enter-to) {
    transform: translateX(0);
  }

  @include e(fade-enter-active) {
    transition: transform .3s;
  }

  @include e(fade-leave-from) {
    opacity: 1;
  }

  @include e(fade-leave-active) {
    transition: opacity .3s;
  }

  @include e(fade-leave-to) {
    opacity: 0;
  }

  @include e(header) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    padding: 12px 20px;
  }

  @include e(title) {}

  @include e(close) {
    font-size: 24px;
    color: $--text-color-secondary;
    cursor: pointer;
    user-select: none;
  }

  @include e(body) {
    padding: 0 20px 20px;
    color: $--text-color;
  }
}
</style>
