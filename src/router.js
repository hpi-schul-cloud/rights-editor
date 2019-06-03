import Vue from 'vue';
import Router from 'vue-router';
import Start from './views/Start.vue';
import OER from './views/OER.vue';
import ODRLStart from './views/ODRLStart.vue';
import FullEditor from './views/FullEditor.vue';
import SaveScreen from './views/SaveScreen.vue';
import BuyCaseStudy from './views/BuyCaseStudy.vue';
import SCEditor from './views/SCEditor.vue';
import SCStart from './views/SCStart.vue';

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
      path: '/odrl-start',
      name: 'odrl-start',
      component: ODRLStart,
    },
    {
      path: '/odrl-editor',
      name: 'odrl-editor',
      component: FullEditor,
      props: true,
    },
    {
      path: '/schul-cloud-start',
      name: 'sc-start',
      component: SCStart,
    },
    {
      path: '/schul-cloud-editor',
      name: 'sc-editor',
      component: SCEditor,
      props: true,
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
