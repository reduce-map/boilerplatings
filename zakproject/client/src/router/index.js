import Vue from 'vue'
import Router from 'vue-router'
import * as Auth from '@/components/pages/Authentication'



// Pages
import Home from '@/components/pages/Home'
import Authentication from '@/components/pages/Authentication/Authentication'
import Table from '@/components/Table/TableClient'
import Select from '@/components/Table/Select'
import Main from '@/components/Menu/MainMenu'
import AddClient from '@/components/Menu/addClient'
import ChangeClient from '@/components/Menu/ChangeClient'
import HeaderTemplate from '@/components/PagesZakProject/Headers/HeaderTemplate'
import MainTemplate from '@/components/PagesZakProject/Main/MainTemplate'
import SwitchDialog from '@/components/PagesZakProject/Main/SwitchDialog'

import compos from '@/components/PagesZakProject/compos'
import MainPage from '@/components/Tempalate/MainPage'

// Global components
import Header from '@/components/Header'
import List from '@/components/List/List'
import Create from '@/components/pages/Create'
import Parent from  '@/components/Table/parent'

// Register components
Vue.component('app-header', Header)
Vue.component('list', List)
Vue.component('create', Create)


Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/dialog',
      name:'SwitchDialog',
      component:SwitchDialog
    },
    {
      path: '/mainpage',
      name: 'mainpage',
      component: MainPage
    },
    {
      path: '/compos',
      name: 'compos',
      component: compos
    },
    {
      path: '/maintemplate',
      name: 'MainTemplate',
      component: MainTemplate
    },
    {
      path: '/headertemplate',
      name: 'HeaderTemplate',
      component: HeaderTemplate
    },
    {
      path: '/',
      name: 'Home',
      components: {
        default: Home,
        header: Header,
        list: List,
        create: Create
      }
    },
    {
      path: '/select',
      name: 'Select',
      component: Select
    },
    {
      path: '/login',
      name: 'Authentication',
      component: Authentication
    },
    {
      path: '/change',
      name: 'ChangeClient',
      component: ChangeClient
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/addclient',
      name: 'AddClient',
      component: AddClient
    },
    {
      path: '/parent',
      name: 'Parent',
      component: Parent
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (Auth.default.user.authenticated) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
