import Button from '../Button.vue';
import { mount } from '@vue/test-utils';
function randomArray(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}
describe('按钮测试', () => {
  it('按钮能够显示文本', () => {
    const content = '按钮';
    const wrapper = mount(Button, {
      slots: {
        default: content,
      },
    });
    expect(wrapper.text()).toBe(content);
  });

  it('通过type属性控制状态', () => {
    const type = randomArray(['primary', 'danger', 'warning']);
    const wrapper = mount(Button, {
      props: {
        type,
      },
    });
    expect(wrapper.classes()).toContain(`xiao-button--${type}`);
  });

  it('通过size属性控制状态', () => {
    const size = randomArray(['small', 'large']);
    const wrapper = mount(Button, {
      props: {
        size,
      },
    });
    expect(wrapper.classes()).toContain(`xiao-button--${size}`);
  });

  it('通过shape属性控制状态', () => {
    const shape = randomArray(['round', 'circle']);
    const wrapper = mount(Button, {
      props: {
        shape,
      },
    });
    expect(wrapper.classes()).toContain(`xiao-button--${shape}`);
  });
});
