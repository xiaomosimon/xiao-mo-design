import type { App } from 'vue';
import Form from './Form.vue';
import FormItem from './FormItem.vue';

export default {
  install(app: App) {
    app.component(Form.name, Form);
    app.component(FormItem.name, FormItem);
  },
};
