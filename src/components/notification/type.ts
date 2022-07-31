import { definePropType } from '@/utils/types';
import type { ExtractPropTypes, VNode, ComponentPublicInstance } from 'vue';
export const notificationTypes = [
  'success',
  'info',
  'warning',
  'error',
] as const;

export const notificationProps = {
  showClose: Boolean,
  type: {
    type: String,
    values: [...notificationTypes],
    default: 'info',
  },
  message: {
    type: definePropType<string | VNode>([String, Object]),
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  duration: {
    type: Number,
    default: 3000,
  },
  onClose: {
    type: definePropType<(vm: VNode) => void>(Function),
  },
  id: {
    type: String,
    default: '',
  },
  offset: {
    type: Number,
    default: 0,
  },
  zIndex: {
    type: Number,
    default: 0,
  },
} as const;

export type NotificationProps = ExtractPropTypes<typeof notificationProps>;

export type NotificationOptions = Omit<NotificationProps, 'id'> & {
  appendTo?: HTMLElement;
};
export type NotificationOptionsTyped = Omit<NotificationOptions, 'type'>;

export type NotificationParams = Partial<NotificationOptions> | string | VNode;

export type NotificationParamsTyped =
  | Partial<NotificationOptionsTyped>
  | string
  | VNode;

export type NotificationProxy = ComponentPublicInstance<
  NotificationProps,
  {
    close: () => void;
  },
  { visible: boolean }
>;

export interface NotificationHandle {
  vm: VNode,
  proxy: NotificationProxy;
  close: () => void;
}

export type NotifyFn = (options?: NotificationParams) => NotificationHandle;

export type NotifyTypedFn = (
  options?: NotificationParamsTyped
) => NotificationHandle;

export interface Notify extends NotifyFn {
  success: NotifyTypedFn;
  info: NotifyTypedFn;
  warning: NotifyTypedFn;
  error: NotifyTypedFn;
}
