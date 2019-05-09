import Vue from 'vue';
import Router from 'vue-router';
import Start from './views/Start.vue';
import OER from './views/OER.vue';
import FullEditor from './views/FullEditor.vue';
import SaveScreen from './views/SaveScreen.vue';
import BuyCaseStudy from './views/BuyCaseStudy.vue';
import SCEditor from './views/SCEditor.vue';

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
      path: '/odrl-editor',
      name: 'odrl-editor',
      component: FullEditor,
    },
    {
      path: '/schul-cloud-editor',
      name: 'sc-editor',
      component: SCEditor,
    },
    { // should go into sc-editor
      path: '/check-before-save',
      name: 'check-before-save',
      component: SaveScreen,
      props: true,
    },
    {
      path: '/filmsortiment-case-study',
      name: 'filmsortiment-case-study',
      component: BuyCaseStudy,
    },
  ],
});
