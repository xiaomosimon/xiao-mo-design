import Notification from '../Notification.vue';
import { XiaoNotification } from '../index';
import { mount } from '@vue/test-utils';
import { h } from 'vue';

const randomArray = (list: string[]): string => {
  return list[Math.floor(Math.random() * list.length)];
};

const tick = () => new Promise((cb) => setImmediate(cb));
export const advanceTimersByTime = async (time: number) =>
  jest.advanceTimersByTime(time) && (await tick());

// export const runOnlyPendingTimers = async () =>
//   jest.runOnlyPendingTimers() && (await tick());
// export const runAllTimers = async () => jest.runAllTimers() && (await tick());

describe('Notification组件渲染测试', () => {
  it('id存在', () => {
    const id = 'notification_123';
    const wrapper = mount(Notification, {
      props: {
        id,
      },
    });
    expect(wrapper.find(`#${id}`).exists()).toBeTruthy();
  });

  it('position', () => {
    const wrapper = mount(Notification, {
      props: {
        offset: 30,
        zIndex: 3000,
      },
    });

    expect(wrapper.find('.xiao-notification').attributes('style')).toContain(
      'right: 20px; z-index: 3000; top: 30px;'
    );
  });

  it('type存在', () => {
    const type = randomArray(['success', 'error', 'warning']);

    const wrapper = mount(Notification, {
      props: {
        type,
      },
    });
    expect(
      wrapper.find('.xiao-notification').classes(`xiao-notification__${type}`)
    ).toBeTruthy();
  });

  it('title展示', () => {
    const title = '测试';
    const wrapper = mount(Notification, {
      props: {
        title,
      },
    });
    expect(wrapper.get('.xiao-notification-title').text()).toBe(title);
  });

  it('message展示', () => {
    const message = '测试';
    const wrapper = mount(Notification, {
      props: {
        message,
      },
    });
    expect(wrapper.get('.xiao-notification-body').text()).toBe(message);
  });

  it('关闭按钮展示', () => {
    const wrapper = mount(Notification, {
      props: {
        showClose: true,
      },
    });
    expect(wrapper.find('.xiao-notification-close').exists()).toBeTruthy();
  });

  it('点击关闭按钮', async () => {
    const wrapper = mount(Notification, {
      props: {
        showClose: true,
      },
    });
    await wrapper.find('.xiao-notification-close').trigger('click');
    expect(wrapper.get('.xiao-notification').isVisible()).toBeFalsy();
  });

  it('持续时间之后自动关闭', async () => {
    jest.useFakeTimers();
    const wrapper = mount(Notification, {
      props: {
        duration: 1000,
      },
    });
    await advanceTimersByTime(1000);
    expect(wrapper.get('.xiao-notification').isVisible()).toBeFalsy();
  });
});

describe('Notification动态渲染测试', () => {
  it('默认配置', () => {
    const instanceProxy = XiaoNotification('哈哈哈');
    expect(instanceProxy.vm.props!.message).toBe('哈哈哈');
    expect(instanceProxy.vm.props!.duration).toBe(3000);
    expect(instanceProxy.vm.props!.type).toBe('info');
    expect(instanceProxy.vm.props!.zIndex).toBeGreaterThan(2000);
    expect(instanceProxy.vm.props!.id).toBe('notification_1');
    expect(instanceProxy.vm.props!.offset).toBeGreaterThanOrEqual(16);
  });

  it('多个Notification', () => {
    XiaoNotification('哈哈哈');
    const instanceProxy = XiaoNotification('哈哈哈');
    expect(instanceProxy.vm.props!.id).toBe('notification_3');
  });

  it('手动关闭Notification', () => {
    const instanceProxy = XiaoNotification({
      message: '手动关闭',
      duration: 0
    });
    expect(instanceProxy.vm.props!.duration).toBe(0);
    expect(instanceProxy.close()).toBeFalsy();
  });

  it('类型方法', () => {
    const instanceProxy = XiaoNotification.success(h('h1',{}, 'hhhh'));
    expect(instanceProxy.vm.props!.message).toBeInstanceOf(Object);
    expect(instanceProxy.vm.props!.onDestroy).toBeInstanceOf(Function);
  });
});
