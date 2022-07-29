import FormItem from '../FormItem.vue';
import { mount } from '@vue/test-utils';
import { h } from 'vue';

describe('FormItem组件测试', () => {
  it('FormItem默认插槽', () => {
    const content = '123';
    const wrapper = mount(FormItem, {
      slots: {
        default: content,
      },
    });
    expect(wrapper.find('.xiao-form-item-control-content').text()).toBe(
      content
    );
  });

  it('FormItem Label插槽', () => {
    const content = 'label slot';
    const wrapper = mount(FormItem, {
      slots: {
        label: h(
          'span',
          {
            class: 'label-slot',
          },
          content
        ),
      },
    });
    expect(wrapper.find('.label-slot').text()).toBe(content);
  });

  it('FormItem label和labelAlign属性', () => {
    const content = '测试Label';
    const wrapper = mount(FormItem, {
      props: {
        label: content,
        labelAlign: 'right',
      },
    });
    expect(wrapper.find('.xiao-form-item-label').text()).toBe(content);
    expect(wrapper.find('.xiao-form-item-label').attributes('style')).toContain(
      'text-align: right'
    );
  });
});
