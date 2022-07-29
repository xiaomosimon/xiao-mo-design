<template>
  <div :class="ns.b()">
    <slot />
  </div>
</template>
<script lang="ts" setup>
import useNamespace from '@/hooks/useNamespace';
import { reactive, provide, toRefs } from 'vue';
import { formProps, formContextKey } from './type';
import type { FormContext, FormValidateType, FormItemContext } from './type';

const ns = useNamespace('form');

// TODO 待vue3解决  https://github.com/vuejs/core/issues/4294
// const props = withDefaults(defineProps<FormProps>(), {
const props = defineProps(formProps);

const fields: FormItemContext[] = [];

const addField: FormContext['addField'] = (field) => {
  fields.push(field);
};

const validate: FormValidateType = (cb?: (isValid: boolean) => void) => {
  const tasks = fields.map((field: FormItemContext) => field.validate());
  const results = Promise.all(tasks);
  if (cb) {
    results.then(() => cb(true)).catch(() => cb(false));
  } else {
    return new Promise((resolve, reject) => {
      results.then(() => resolve(true)).catch(() => reject(false));
    });
  }
};

provide(formContextKey, reactive({
  ...toRefs(props),
  validate,
  addField
}));


defineExpose({
  validate
});

</script>
<script lang="ts">
export default {
  name: 'XiaoForm',
};
</script>
<style lang="scss" scoped>
@import '../../styles/mixin.scss';

@include b(form) {}
</style>
