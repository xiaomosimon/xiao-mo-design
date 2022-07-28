<template>
  <input class="xiao-input" :value="modelValue" @input="onInput" />
</template>
<script lang="ts" setup>
type TargetElement = HTMLInputElement | HTMLTextAreaElement
interface Props {
  modelValue: string | number | null | undefined;
}

defineProps<Props>();

const emits = defineEmits(['update:modelValue']);

function onInput(event: Event) {
  let { value } = event.target as TargetElement;
  emits('update:modelValue', value);
}

</script>
<script lang="ts">
export default {
  name: 'XiaoInput',
};
</script>
<style lang="scss" scoped>
@import '../../styles/theme.scss';
@import '../../styles/mixin.scss';

@include b(input) {}
</style>
