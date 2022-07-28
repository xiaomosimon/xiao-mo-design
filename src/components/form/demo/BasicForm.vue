<template>
  <xiao-form layout="vertical" :model="formState" :rules="formRules" ref="form" label-width="50px" class="demo-form">
    <xiao-form-item label="用户名" prop="username">
      <xiao-input v-model="formState.username"></xiao-input>
    </xiao-form-item>
    <xiao-form-item label="密码" prop="password" label-align="right">
      <xiao-input v-model="formState.password"></xiao-input>
    </xiao-form-item>
    <xiao-form-item>
      <xiao-button type="primary" @click="login">登录</xiao-button>
      <xiao-button @click="asyncLogin">异步登录验证</xiao-button>
    </xiao-form-item>
  </xiao-form>
</template>
<script lang="ts" setup>
import XiaoForm from '../Form.vue';
import XiaoFormItem from '../FormItem.vue';
import XiaoButton from '@/components/button/Button.vue';
import XiaoInput from '@/components/input/Input.vue';
import { ref, reactive } from 'vue';
const form = ref();

interface FormStateType {
  username: string;
  password: string;
}
const formState = reactive<FormStateType>({
  username: '',
  password: ''
});

interface FormRulesType {
  username?: object | object[],
  password?: object | object[],
}

const formRules = reactive<FormRulesType>({
  username: {
    required: true,
    message: '不能为空',
    trigger: 'blur'
  },
  password: [{
    required: true,
    min: 6,
    message: '请输入至少6个字符',
    trigger: 'change'
  }]
});

function login() {
  form.value.validate((valid: boolean) => {
    if (valid) {
      // alert('login!');
    } else {
      // console.log('error login');
      return false;
    }
  });
  // console.log('login');
}

function asyncLogin() {
  form.value.validate().then((valid: boolean) => {
    return valid;
  }).catch((err: boolean)=> {
    return err;
  });
}
// function resetForm() {
//   console.log('rest');
// }
</script>
