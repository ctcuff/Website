import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
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

router.beforeEach((to, from, next) => {
  if (noOverflowRoutes.includes(to.path)) {
    document.body.classList.add('no-overflow')
  } else {
    document.body.classList.remove('no-overflow')
  }
  next()
})

export default router
