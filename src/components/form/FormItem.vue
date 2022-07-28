<template>
  <div class="xiao-row xiao-form-item" :class="errorMessage ? 'xiao-form-item-has-error' : ''">
    <label v-if="showFixedLabel" class="xiao-form-item-label" :style="labelStyle">{{ label }}</label>
    <slot name="label" />
    <div class="xiao-form-item-control">
      <div class="xiao-form-item-control-content">
        <slot />
      </div>
      <div v-if="errorMessage" class="xiao-form-item-explain xiao-form-item-explain-error">{{ errorMessage }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Shchema from 'async-validator';
import { inject, useSlots, ref, reactive, toRefs, computed, onMounted, provide } from 'vue';
import type { FormItemContext } from './type';
import { formItemProps, formContextKey, formItemContextKey } from './type';
import { isUndefined } from '@/utils/type';
type LabelStyle = Record<string, string>;
// form数据
const formContext = inject(formContextKey, undefined);


// TODO 待vue3解决  https://github.com/vuejs/core/issues/4294
// const props = withDefaults(defineProps<FormItemProps>(), {
const props = defineProps(formItemProps);

const slots = useSlots();

const showFixedLabel = computed(() => !!(slots && slots.label || props.label));

// 样式 展示
const labelStyle = computed(() => {
  const style:LabelStyle = {};
  if(formContext) {
    if(formContext.labelAlign) {
      style.textAlign = formContext.labelAlign;
    }
    if(formContext.labelWidth) {
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

  &-has-error {
    margin-bottom: 0;
  }

  &-label {
    flex: none;
    padding-right: 6px;
    font-size: $--font-size-base;
    vertical-align: middle;
  }

  &-control {
    &-content {}
  }

  &-explain {
    min-height: 24px;

    &-error {
      font-size: $--font-size-base;
      color: $--error-color;
    }
  }
}
</style>
