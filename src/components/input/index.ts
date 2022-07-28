import { App } from 'vue';
import Input from './Input.vue';

export default {
  install(app: App) {
    app.component(Input.name, Input);
  },
};
