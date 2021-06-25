import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta: {requireAuth: true}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import(/* webpackChunkName: "Signup" */ '../views/Signup.vue')
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "Edit" */ '../views/Edit.vue'),
    meta: {requireAuth: true}
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import(/* webpackChunkName: "404" */ "../views/404.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async(to, _, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requireAuth)

    store.commit('moduleAuth/setErrors', null)

    console.log('desde router')

    if(!rutaProtegida) return next()

    if(localStorage.getItem('token')){
        if(await store.dispatch('moduleAuth/verificarToken')){
            next()
        }else {
            next('/login')
        }
    }else {
        next('/login')
    }
})

export default router
