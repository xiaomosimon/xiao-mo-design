import { InjectionKey } from 'vue';
// import { Rules, Values } from 'async-validator';
import { Values } from 'async-validator';
import type { ExtractPropTypes } from 'vue';

export const formProps = {
  model: Object,
  rules: Object,
  layout: {
    type: String,
    values: ['horizontal', 'vertical', 'inline'],
    default: 'horizontal',
  },
  labelWidth: String,
  labelAlign: {
    type: String,
    values: ['left', 'right'],
    default: 'left',
  },
};

export type FormProps = ExtractPropTypes<typeof formProps>;

// export type FormProps = {
//   model?: Record<string, unknown>;
//   rules?: Rules;
//   layout?: 'horizontal' | 'vertical' | 'inline';
//   labelWidth?: string;
//   labelAlign?: 'left' | 'right';
// };

export type FormValidateType = (
  cb?: (isValid?: boolean) => void
) => Promise<boolean> | void;

export type FormContext = FormProps & {
  validate: FormValidateType;
  addField: (context: FormItemContext) => void;
};

export const formItemProps = {
  prop: String,
  label: String,
  layout: {
    type: String,
    values: ['horizontal', 'vertical', 'inline'],
    default: 'horizontal',
  },
  labelAlign: {
    type: String,
    values: ['left', 'right'],
    default: 'left',
  },
};

export type FormItemProps = ExtractPropTypes<typeof formItemProps>;

// export type FormItemProps = {
//   prop?: string;
//   label?: string;
//   labelAlign?: 'left' | 'right';
// };

export type FormItemContext = FormItemProps & {
  validate: () => Promise<Values>;
};

export const formContextKey: InjectionKey<FormContext> = Symbol('form-context');

export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('form-item-context');
