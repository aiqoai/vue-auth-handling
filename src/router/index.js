import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserBoard from '@/components/UserBoard'
import Admin from '@/components/Admin'
import Products from '@/components/Products'
import Cart from '@/components/Cart'
import Carousel from '@/components/Carousel'

import Home from '@/screen/Home'
import Catelogue from '@/screen/Catalogue'
import Build from '@/screen/Build'
import Play from '@/screen/Play'
import Profile from '@/screen/Profile'

import Learning from '@/screen/wordlearn/learning'
import Practice from '@/screen/wordlearn/practice'
import Favorite from "../screen/Favorite";

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        guest: true,
        requiresAuth: false
      }
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: Catelogue,
      meta: {
        guest: true,
        requiresAuth: false
      }
    },

    {
      path: '/build',
      name: 'build',
      component: Build,
      meta: {
        guest: true,
        requiresAuth: false
      }
    },
    {
      path: '/play',
      name: 'play',
      component: Play,
      meta: {
        guest: true,
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        guest: true,
        requiresAuth: false
      }
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        requiresAuth: false
      }
    },

    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          requiresAuth: false,
            guest: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { 
            requiresAuth: true
        }
    },
    {
        path: '/carousel',
        name: 'carousel',
        component: Carousel,
        meta: { 
            requiresAuth: false
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: { 
            requiresAuth: false,
            is_admin : true
        }
    },
    {
      path: '/learning',
      name: 'learning',
      component: Learning,
      // props: (route) => ({ selected: route.query.selected }),
      meta: { 
          requiresAuth: false
      }
    },
    {
      path: '/practice',
      name: 'practice',
      component: Practice,
      props: true,
      meta: { 
          requiresAuth: false
      }
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: Favorite,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  next()

  // if(to.matched.some(record => record.meta.requiresAuth)) {
  //   // console.log("requiresAuth: ",record.meta)
  //   console.log(" JWT: ",localStorage.getItem('jwt') )
  //
  //   if (localStorage.getItem('jwt') == null)
  //   {
  //     next({
  //       path: '/login',
  //       params: { nextUrl: to.fullPath }
  //     })
  //   } else {
  //     let user = JSON.parse(localStorage.getItem('user'))
  //     if(to.matched.some(record => record.meta.is_admin)) {
  //       if(user.is_admin == 1){
  //           next()
  //       }
  //       else{
  //           next({ name: 'userboard'})
  //       }
  //     }
  //     else {
  //     	next()
  //     }
  //   }
  // }
  // else if(to.matched.some(record => record.meta.guest)) {
  //   // console.log("guest: ", record.meta.guest)
	//     if(localStorage.getItem('jwt') == null){
	//         next()
	//     }
	//     else{
	//         next({ name: 'userboard'})
	//     }
  //   }else {
  //   next()
  // }
})

export default router
