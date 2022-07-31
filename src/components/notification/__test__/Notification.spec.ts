import Notification from '../Notification.vue';
import { XiaoNotification, close } from '../index';
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

    expect(instanceProxy.proxy.visible).toBe(true);
    expect(instanceProxy.proxy.id).toBe('notification_1');
    expect(instanceProxy.proxy.title).toBe('');
    expect(instanceProxy.proxy.message).toBe('哈哈哈');
    expect(instanceProxy.proxy.duration).toBe(3000);
    expect(instanceProxy.proxy.type).toBe('info');
    expect(instanceProxy.proxy.showClose).toBe(false);
    expect(instanceProxy.proxy.zIndex).toBeGreaterThan(2000);
    expect(instanceProxy.proxy.offset).toBeGreaterThanOrEqual(16);
  });

  it('多个Notification', () => {
    const instanceProxyMessage1 = '提示哈哈哈';
    const instanceProxyMessage2 = '再建一个哈哈';
    const instanceProxy1 = XiaoNotification(instanceProxyMessage1);
    const instanceProxy2 = XiaoNotification(instanceProxyMessage2);
    expect(instanceProxy1.proxy.id).toBe('notification_2');
    expect(instanceProxy1.proxy.message).toBe(instanceProxyMessage1);
    expect(instanceProxy1.proxy.zIndex).toBe(2002);
    expect(instanceProxy2.proxy.id).toBe('notification_3');
    expect(instanceProxy2.proxy.message).toBe(instanceProxyMessage2);
    expect(instanceProxy2.proxy.zIndex).toBe(2003);
  });

  it('手动关闭', () => {
    const instanceProxy = XiaoNotification({
      message: '手动关闭',
      duration: 0,
    });
    expect(instanceProxy.proxy.duration).toBe(0);
    expect(instanceProxy.close()).toBeFalsy();
    expect(instanceProxy.proxy.visible).toBe(false);
  });

  it('普通配置', () => {
    const instanceProxy = XiaoNotification({
      title: '提示',
      message: '请将信息填写完整',
    });
    expect(instanceProxy.proxy.title).toBe('提示');
    expect(instanceProxy.proxy.message).toBe('请将信息填写完整');
  });

  it('类型方法', () => {
    const children = h('h1', {}, 'hhhh');
    const instanceProxy = XiaoNotification.success(children);
    expect(instanceProxy.proxy.type).toBe('success');
    expect(instanceProxy.proxy.message).toBe(children);
  });

  it('方法测试', () => {
    const instanceProxy = XiaoNotification.success({
      message: '成功了',
      duration: 0,
      onClose() {
        instanceProxy.proxy.visible = false;
      },
    });

    expect(instanceProxy.proxy.visible).toBe(true);
    instanceProxy.proxy.onClose &&
      instanceProxy.proxy.onClose(instanceProxy.vm);
    instanceProxy.vm.props!.onDestroy();
    expect(instanceProxy.proxy.visible).toBe(false);
  });

  it('close id查询', () => {
    const instanceProxy = XiaoNotification.success({
      message: '成功了',
      duration: 0,
    });

    expect(instanceProxy.proxy.visible).toBe(true);
    close(instanceProxy.proxy.id, () => {
      instanceProxy.proxy.visible = false;
    });
    expect(instanceProxy.proxy.visible).toBe(false);
  });

  it('close 没有的id查询', () => {
    const instanceProxy = XiaoNotification.success({
      message: '成功了',
      duration: 0,
      onClose() {
        instanceProxy.proxy.visible = false;
      },
    });

    expect(instanceProxy.proxy.visible).toBe(true);
    close('abc_id');
    expect(instanceProxy.proxy.visible).toBe(true);
  });
});
