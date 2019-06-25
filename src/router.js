import Vue from 'vue';
import Router from 'vue-router';
import Start from './views/Start.vue';
import OER from './views/OER.vue';
import ODRLStart from './views/ODRLStart.vue';
import ODRLEditor from './views/ODRLEditor.vue';
import ODRLSaveScreen from './views/ODRLSaveScreen.vue';
import BuyCaseStudy from './views/BuyCaseStudy.vue';
import SCEditor from './views/SCEditor.vue';
import SCStart from './views/SCStart.vue';
import SCSaveScreen from './views/SCSaveScreen.vue';

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
      component: ODRLEditor,
      props: true,
    },
    {
      path: '/odrl-save',
      name: 'odrl-save',
      component: ODRLSaveScreen,
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
    {
      path: '/schul-cloud-save',
      name: 'sc-save',
      component: SCSaveScreen,
      props: true,
    },
    {
      path: '/filmsortiment-case-study',
      name: 'filmsortiment-case-study',
      component: BuyCaseStudy,
    },

  ],
});
