import Vue from 'vue';
import Router from 'vue-router';
import Start from './views/Start.vue';
import OER from './views/OER.vue';
import Proprietary from './views/Proprietary.vue';
import SaveScreen from './views/SaveScreen.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'start',
      component: Start,
    },
    {
      path: '/oer',
      name: 'oer',
      component: OER,
    },
    {
      path: '/proprietary',
      name: 'proprietary',
      component: Proprietary,
    },
    {
      path: '/meta',
      name: 'meta',
      component: Metadata,
    },
    {
      path: '/check-before-save',
      name: 'check-before-save',
      component: SaveScreen,
      props: true,
    },
  ],
});
