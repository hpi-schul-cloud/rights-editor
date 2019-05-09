import Vue from 'vue';
import Router from 'vue-router';
import Start from './views/Start.vue';
import OER from './views/OER.vue';
import Proprietary from './views/Proprietary.vue';
import OfferCreation from './views/OfferCreation.vue';
import SaveScreen from './views/SaveScreen.vue';
import BuyCaseStudy from './views/BuyCaseStudy';

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
      path: '/offer-creation',
      name: 'offer-creation',
      component: OfferCreation,
    },
    {
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
