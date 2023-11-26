import Vue from 'vue'
import Router, { NavigationGuardNext, Route } from 'vue-router'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import Projects from '@/components/Projects.vue'
import Contact from '@/components/Contact.vue'
import ProjectInfo from '@/components/ProjectInfo.vue'

Vue.use(Router)

// Routes that shouldn't have a scrollbar
const noOverflowRoutes = ['/', '/projects']

const router = new Router({
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
    {
      path: '/project',
      component: ProjectInfo
    }
  ]
})

router.beforeEach((to: Route, _from: Route, next: NavigationGuardNext<Vue>) => {
  if (noOverflowRoutes.includes(to.path)) {
    document.body.classList.add('no-overflow')
  } else {
    document.body.classList.remove('no-overflow')
  }
  next()
})

export default router
