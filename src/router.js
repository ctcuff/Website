import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import Contact from '@/pages/Contact';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
    {
      path: '/projects',
      component: Projects
    },
    {
      path: '/contact',
      component: Contact
    },
  ]
});