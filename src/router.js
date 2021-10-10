import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Projects from '@/pages/Projects.vue'
import Contact from '@/pages/Contact.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/projects',
      component: Projects
    },
    {
      path: '/contact',
      component: Contact
    }
  ]
})

export default router
