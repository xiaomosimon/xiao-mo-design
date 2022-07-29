<template>
  <div :class="['xiao-row', ns.b(), errorMessage ? 'xiao-form-item-has-error' : '']">

    <slot name="label">
      <label :class="ns.e('label')" :style="labelStyle">{{ label }}</label>
    </slot>
    <div :class="ns.e('control')">
      <div :class="ns.e('control-content')">
        <slot />
      </div>
      <div v-if="errorMessage" :class="[ns.e('explain'), ns.e('explain-error')]">{{ errorMessage }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useNamespace from '@/hooks/useNamespace';
import Shchema from 'async-validator';
import { inject, ref, reactive, toRefs, computed, onMounted, provide } from 'vue';
import { isUndefined } from '@/utils/types';
import { formItemProps, formContextKey, formItemContextKey } from './type';
import type { FormItemContext } from './type';
type LabelStyle = Record<string, string>;

const ns = useNamespace('form-item');

// form数据
const formContext = inject(formContextKey, undefined);

// TODO 待vue3解决  https://github.com/vuejs/core/issues/4294
// const props = withDefaults(defineProps<FormItemProps>(), {
const props = defineProps(formItemProps);

// 样式 展示
const labelStyle = computed(() => {
  const style: LabelStyle = {};
  if (formContext) {
    if (formContext.labelAlign) {
      style.textAlign = formContext.labelAlign;
    }
    if (formContext.labelWidth) {
      style.width = formContext.labelWidth;
    }
  }
  if (props.labelAlign) {
    style.textAlign = props.labelAlign;
  }
  return style;
});
// 错误信息
const errorMessage = ref<string>('');

const validate: FormItemContext['validate'] = () => {
  if (isUndefined(formContext) || isUndefined(formContext.model) || isUndefined(formContext.rules) || isUndefined(props.prop)) {
    return Promise.resolve({ result: true });
  }
  const propKey = props.prop;
  const propRule = formContext.rules[propKey];
  const propValue = formContext.model[propKey];
  const schema = new Shchema({ [propKey]: propRule });
  return schema.validate({ [propKey]: propValue }, (errors) => {
    errorMessage.value = errors ? errors[0].message || '校验错误' : '';
  });
};


const context: FormItemContext = reactive({
  ...toRefs(props),
  validate
});

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
  }
});

defineExpose({
  validate
});


provide(formItemContextKey, context);

</script>
<script lang="ts">
export default {
  name: 'XiaoFormItem',
};
</script>
<style lang="scss" scoped>
@import '../../styles/theme.scss';
@import '../../styles/mixin.scss';

@include b(form-item) {
  box-sizing: border-box;
  margin-bottom: 24px;
  vertical-align: top;

  @include e(has-error) {
    margin-bottom: 0;
  }

  @include e(label) {
    flex: none;
    padding-right: 6px;
    font-size: $--font-size-base;
    vertical-align: middle;
  }

  @include e(control) {
    &-content {}
  }

  @include e(explain) {
    min-height: 24px;

    &-error {
      font-size: $--font-size-base;
      color: $--error-color;
    }
  }
}
</style>
