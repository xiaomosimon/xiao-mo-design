import { createApp } from 'vue';
import App from './App.vue';
import XiaoContainer from './components/container';
import XiaoButton from './components/button';
import XiaoForm from './components/form';
import XiaoInput from './components/input';
createApp(App)
  .use(XiaoContainer)
  .use(XiaoButton)
  .use(XiaoForm)
  .use(XiaoInput)
  .mount('#app');
