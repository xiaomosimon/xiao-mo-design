import { notificationTypes } from './type';
import Notification from './Notification.vue';
import useZIndex from '@/hooks/useZIndex';
import { render, createVNode, isVNode } from 'vue';
import type { VNode, ComponentPublicInstance } from 'vue';
import type { NotifyFn, Notify, NotificationProps, NotificationProxy } from './type';

const GAP_SIZE = 16;
let seed = 1;
const notifications: VNode[] = [];
const notify: NotifyFn & Partial<Notify> = function (options = {}) {
  if (typeof options === 'string' || isVNode(options)) {
    options = { message: options };
  }
  const { nextZIndex } = useZIndex();
  const id = `notification_${seed++}`;
  const verticalOffset = notifications.reduce((sum, vm) => {
    sum += (vm.el?.offsetHeight || 0) + GAP_SIZE;
    return sum;
  }, (options.offset || 0) + GAP_SIZE);

  const userOnClose = options.onClose;
  const props: Partial<NotificationProps> = {
    type: 'info',
    duration: 3000,
    ...options,
    zIndex: nextZIndex(),
    id,
    offset: verticalOffset,
    onClose: () => {
      close(id, userOnClose);
    },
  };

  const appendTo: HTMLElement | null = document.body;

  const container = document.createElement('div');

  const vm = createVNode(
    Notification,
    props,
    isVNode(props.message) ? { default: () => props.message } : null
  );

  render(vm, container);
  notifications.push(vm);
  appendTo && appendTo.appendChild(container.firstElementChild!);

  vm.props!.onDestroy = () => {
    render(null, container);
  };

  return {
    vm,
    proxy: vm.component!.proxy as NotificationProxy,
    close: () => {
      (
        vm.component!.proxy as ComponentPublicInstance<{ visible: boolean }>
      ).visible = false;
    },
  };
};

notificationTypes.forEach((type) => {
  notify[type] = (options = {}) => {
    if (typeof options === 'string' || isVNode(options)) {
      options = {
        message: options,
      };
    }
    return notify({
      ...options,
      type,
    });
  };
});

export function close(id: string, userOnClose?: (vm: VNode) => void): void {
  const idx = notifications.findIndex((vm) => vm.component?.props.id === id);
  if (idx === -1) return;
  const vm = notifications[idx];
  if (!vm) return;
  userOnClose?.(vm);

  const removedHeight = vm.el!.offsetHeight;
  notifications.splice(idx, 1);
  const len = notifications.length;
  if (len < 1) return;
  for (let i = idx; i < len; i++) {
    const { el, component } = notifications[i];
    const pos =
      Number.parseInt(el!.style['top'], 10) - removedHeight - GAP_SIZE;
    component!.props.offset = pos;
  }
}
export default notify as Notify;
