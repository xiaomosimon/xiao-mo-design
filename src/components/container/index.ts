import type { App } from 'vue';
import Layout from './Layout.vue';
import Header from './Header.vue';
import Content from './Content.vue';
import Footer from './Footer.vue';
import Aside from './Aside.vue';

export default {
  install(app: App) {
    app.component(Layout.name, Layout);
    app.component(Header.name, Header);
    app.component(Content.name, Content);
    app.component(Footer.name, Footer);
    app.component(Aside.name, Aside);
  },
};
