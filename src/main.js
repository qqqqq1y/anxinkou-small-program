import Vue from 'vue';
import App from './App';
import router from './router';

import navigation from './components/navigation';

import Vant from 'vant';
import 'vant/lib/index.css';

import './assets/reset.css';
import './assets/common.scss';

import VueCropper from 'vue-cropper';
Vue.use(VueCropper);

Vue.component('navigation', navigation);
Vue.config.productionTip = false;

Vue.use(Vant);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
