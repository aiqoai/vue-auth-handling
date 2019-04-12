import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserBoard from '@/components/UserBoard'
import Admin from '@/components/Admin'
import Products from '@/components/Products'
import Cart from '@/components/Cart'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
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
        path: '/dashboard',
        name: 'userboard',
        component: UserBoard,
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
