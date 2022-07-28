import Form from '../Form.vue';
import FormItem from '../FormItem.vue';
import BasicForm from '../demo/BasicForm.vue';
import Button from '@/components/button/Button.vue';
import Input from '@/components/input/Input.vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
describe('基本实例表单Form测试', () => {
  let wrapper: VueWrapper;
  let formItemList: VueWrapper[];
  let inputList: VueWrapper[];
  let buttonComList: VueWrapper[];
  beforeEach(() => {
    wrapper = mount(BasicForm);
    formItemList = wrapper.findAllComponents(FormItem);
    inputList = wrapper.findAllComponents(Input);
    buttonComList = wrapper.findAllComponents(Button);
  });

  it('存在Form', () => {
    expect(wrapper.findComponent(Form).exists()).toBeTruthy();
  });

  it('Form下FormItem', () => {
    expect(formItemList).toHaveLength(3);
  });

  it('Form下Input', () => {
    expect(inputList).toHaveLength(2);
  });

  it('Form下Button', () => {
    expect(buttonComList).toHaveLength(2);
  });

  it('FormItem存在props属性1', () => {
    expect(formItemList[0].props()).toEqual({
      prop: 'username',
      label: '用户名',
      labelAlign: 'left',
      layout: 'horizontal'
    });
  });

  it('FormItem存在props属性2', () => {
    expect(formItemList[1].props()).toEqual({
      prop: 'password',
      label: '密码',
      labelAlign: 'right',
      layout: 'horizontal'
    });
  });

  it('Form属性影响FormItem', () => {
    expect(
      formItemList[0].find('.xiao-form-item-label').attributes('style')
    ).toContain('width: 50px');
  });

  it('Form属性影响FormItem', () => {
    expect(
      formItemList[1].find('.xiao-form-item-label').attributes('style')
    ).toContain('width: 50px');
  });

  it('FormItem属性影响', () => {
    expect(
      formItemList[1].find('.xiao-form-item-label').attributes('style')
    ).toContain('text-align: right');
  });
});

describe('基本实例表单点击登录验证', () => {
  let wrapper: VueWrapper;
  let formItemList: VueWrapper[];
  let inputList: VueWrapper[];
  let buttonComList: VueWrapper[];
  beforeEach(() => {
    wrapper = mount(BasicForm);
    formItemList = wrapper.findAllComponents(FormItem);
    inputList = wrapper.findAllComponents(Input);
    buttonComList = wrapper.findAllComponents(Button);
  });
  it('Form下FormItem没有error', () => {
    expect(wrapper.findAll('.xiao-form-item-has-error')).toHaveLength(0);
  });

  it('Form下点击登录按钮1', async () => {
    await buttonComList[0].trigger('click');
    expect(wrapper.findAll('.xiao-form-item-has-error')).toHaveLength(2);
  });

  it('Form下点击登录按钮2', async () => {
    await buttonComList[0].trigger('click');
    expect(wrapper.findAll('.xiao-form-item-explain-error')).toHaveLength(2);
  });

  it('Form下点击登录按钮3,用户名item变化', async () => {
    await buttonComList[0].trigger('click');
    expect(formItemList[0].find('.xiao-form-item-has-error').text()).toBe(
      '用户名不能为空'
    );
  });

  it('Form下点击登录按钮4,密码item变化', async () => {
    await buttonComList[0].trigger('click');
    expect(formItemList[1].find('.xiao-form-item-has-error').text()).toBe(
      '密码请输入至少6个字符'
    );
  });

  it('Form下输入用户名点击登录按钮1', async () => {
    await inputList[0].setValue('simon');
    await buttonComList[0].trigger('click');
    expect(
      formItemList[0].find('.xiao-form-item-has-error').exists()
    ).toBeFalsy();
  });

  it('Form下输入用户名点击登录按钮2', async () => {
    await inputList[0].setValue('simon');
    await buttonComList[0].trigger('click');
    expect(
      formItemList[0].find('.xiao-form-item-explain-error').exists()
    ).toBeFalsy();
  });

  it('Form下输入密码点击登录按钮1', async () => {
    await inputList[1].setValue('simon123');
    await buttonComList[0].trigger('click');
    expect(
      formItemList[1].find('.xiao-form-item-has-error').exists()
    ).toBeFalsy();
  });

  it('Form下输入密码点击登录按钮2', async () => {
    await inputList[1].setValue('simon123');
    await buttonComList[0].trigger('click');
    expect(
      formItemList[1].find('.xiao-form-item-explain-error').exists()
    ).toBeFalsy();
  });

  it('Form下输入密码小于6位点击登录按钮3', async () => {
    await inputList[1].setValue('simon');
    await buttonComList[0].trigger('click');
    expect(formItemList[1].find('.xiao-form-item-explain-error').text()).toBe(
      '请输入至少6个字符'
    );
  });

  it('Form下输入用户名和密码点击登录按钮', async () => {
    await inputList[0].setValue('simon');
    await inputList[1].setValue('simon123');
    await buttonComList[0].trigger('click');
    expect(wrapper.findAll('.xiao-form-item-explain-error')).toHaveLength(0);
  });

  // 登录异步验证
  it('Form下点击登录异步验证按钮1', async () => {
    await buttonComList[1].trigger('click');
    expect(wrapper.findAll('.xiao-form-item-has-error')).toHaveLength(2);
  });

  it('Form下点击登录异步验证按钮2', async () => {
    await buttonComList[1].trigger('click');
    expect(wrapper.findAll('.xiao-form-item-explain-error')).toHaveLength(2);
  });

  it('Form下点击登录异步验证按钮3,用户名item变化', async () => {
    await buttonComList[1].trigger('click');
    expect(formItemList[0].find('.xiao-form-item-has-error').text()).toBe(
      '用户名不能为空'
    );
  });

  it('Form下点击登录异步验证按钮4,密码item变化', async () => {
    await buttonComList[1].trigger('click');
    expect(formItemList[1].find('.xiao-form-item-has-error').text()).toBe(
      '密码请输入至少6个字符'
    );
  });

  it('Form下输入用户名点击登录异步验证按钮1', async () => {
    await inputList[0].setValue('simon');
    await buttonComList[1].trigger('click');
    expect(
      formItemList[0].find('.xiao-form-item-has-error').exists()
    ).toBeFalsy();
  });

  it('Form下输入用户名点击登录异步验证按钮2', async () => {
    await inputList[0].setValue('simon');
    await buttonComList[1].trigger('click');
    expect(
      formItemList[0].find('.xiao-form-item-explain-error').exists()
    ).toBeFalsy();
  });

  it('Form下输入密码点击登录异步验证按钮1', async () => {
    await inputList[1].setValue('simon123');
    await buttonComList[1].trigger('click');
    expect(
      formItemList[1].find('.xiao-form-item-has-error').exists()
    ).toBeFalsy();
  });

  it('Form下输入密码点击登录异步验证按钮2', async () => {
    await inputList[1].setValue('simon123');
    await buttonComList[1].trigger('click');
    expect(
      formItemList[1].find('.xiao-form-item-explain-error').exists()
    ).toBeFalsy();
  });

  it('Form下输入密码小于6位点击登录异步验证按钮3', async () => {
    await inputList[1].setValue('simon');
    await buttonComList[1].trigger('click');
    expect(formItemList[1].find('.xiao-form-item-explain-error').text()).toBe(
      '请输入至少6个字符'
    );
  });

  it('Form下输入用户名和密码点击登录异步验证按钮', async () => {
    await inputList[0].setValue('simon');
    await inputList[1].setValue('simon123');
    await buttonComList[1].trigger('click');
    expect(wrapper.findAll('.xiao-form-item-explain-error')).toHaveLength(0);
  });
});

describe('测试无属性Form下的FormItem验证', ()=> {
  it('FormItem验证', () => {
    const wrapper = mount(BasicForm, {
      data() {
        return {
          model: undefined,
          rules: undefined
        };
      }
    });
    wrapper.findAllComponents(Button)[0].trigger('click');
    expect(wrapper.findAll('.xiao-form-item-explain')).toHaveLength(0);
  });
});