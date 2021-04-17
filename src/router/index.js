import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '../components/user/Login.vue'
// import register from '../components/user/Register.vue'
// import progress from '../components/user/Progress.vue'
// import backstage from '../components/administrator/BackStage.vue'
// import loginAdmin from '../components/administrator/Login-admin.vue'
const register = ()=>import('../components/user/Register.vue')
const progress = ()=>import('../components/user/Progress.vue')
const backstage = ()=>import('../components/administrator/BackStage.vue')
const loginAdmin = ()=>import('../components/administrator/Login-admin.vue')
const login2 = ()=>import('../components/user/XXX.vue')

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: 'login',
    children:[
      
    ]
  },
  // {
  //   path: '/login',
  //   component: login
  // },
  {
    path: '/register',
    component: register
  },
  {
    path: '/progress',
    component: progress
  },
  {
    path: '/admin',
    component: loginAdmin
  },
  {
    path: '/backstage',
    component: backstage
  },
  {
    path: '/login',
    component: login2
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router