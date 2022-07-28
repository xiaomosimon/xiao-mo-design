import BasicInput from '../demo/BasicInput.vue';
import Input from '../Input.vue';
import { mount } from '@vue/test-utils';
import type {VueWrapper} from '@vue/test-utils';
describe('input测试', () => {
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

  it('测试demo的data值username', () => {
    expect(wrapper.find('span').text()).toBe('abc');
  });

  it('测试demo加载了Input组件', () => {
    expect(inputCom.exists()).toBeTruthy();
  });

  it('测试Input组件输入值', async ()=> {
    await inputCom.setValue('abc');
    expect(wrapper.find('span').text()).toBe('abc');
  });

  it('测试Input组件内存在update:modelValue的emit', async ()=> {
    await inputCom.setValue('xiao mo');
    expect(inputCom.emitted()).toHaveProperty('update:modelValue');
  });

  it('测试Input组件内emit的值', async ()=> {
    await inputCom.setValue('xiao mo');
    expect(inputCom.emitted()['update:modelValue'][0]).toEqual(['xiao mo']);
  });

  it('测试Input组件输入值后，父组件绑定的值的变化', async ()=> {
    await inputCom.setValue('xiao mo');
    expect(wrapper.find('span').text()).toBe('xiao mo');
  });

  it('测试Input组件trigger事件1', async ()=> {
    await inputCom.trigger('input');
    expect(wrapper.find('span').text()).toBe('abc');
  });

  it('测试Input组件trigger事件2', async ()=> {
    await inputCom.trigger('input');
    expect(inputCom.emitted()['update:modelValue'][0]).toEqual(['abc']);
  });
});
