import Form from '../Form.vue';
import FormItem from '../FormItem.vue';
import { mount } from '@vue/test-utils';

describe('Form组件测试', () => {
  it('测试Form插槽', () => {
    const wrapper = mount(Form, {
      slots: {
        default: FormItem,
      },
    });
    expect(wrapper.findComponent(FormItem).exists()).toBeTruthy();
  });
});
