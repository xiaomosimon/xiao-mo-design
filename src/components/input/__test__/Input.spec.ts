import BasicInput from '../demo/BasicInput.vue';
import Input from '../Input.vue';
import { mount } from '@vue/test-utils';
import type {VueWrapper} from '@vue/test-utils';
describe('Input组件测试', () => {
  let wrapper: VueWrapper;
  let inputCom: VueWrapper;

  beforeEach(() => {
    wrapper = mount(BasicInput, {
      data() {
        return {
          username: 'abc'
        };
      }
    });
    inputCom = wrapper.findComponent(Input);
  });

  it('基本渲染', () => {
    expect(wrapper.find('span').text()).toBe('abc');
    expect(inputCom.exists()).toBeTruthy();
  });

  it('Input组件输入值', async ()=> {
    await inputCom.setValue('xiao mo');
    expect(inputCom.emitted()).toHaveProperty('update:modelValue');
    expect(inputCom.emitted()['update:modelValue'][0]).toEqual(['xiao mo']);
    expect(wrapper.find('span').text()).toBe('xiao mo');
  });

  it('Input组件trigger input', async ()=> {
    await inputCom.trigger('input');
    expect(wrapper.find('span').text()).toBe('abc');
    expect(inputCom.emitted()['update:modelValue'][0]).toEqual(['abc']);
  });
});
