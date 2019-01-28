import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Battleship from '@/components/Battleship'
import Registro from '@/components/Registro'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Registro
    },
    {
      path: '/home',
      name: 'Home ',
      component: Battleship,
      meta: {
        autentificado: true
      }
    }    
  ]
})

router.beforeEach(((to,from, next) => {
  let usuario = firebase.auth().currentUser;
  console.log(usuario);
  let autorizacion = to.matched.some(record => record.meta.autentificado);

  if (autorizacion && !usuario) {
    next('login')
  } else if (!autorizacion && usuario) {
    next('home');
  } else {
    next();
  }

}))

export default router
