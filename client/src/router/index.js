import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';
import Index from '../pages/index.vue';
import Signup from '../pages/signup.vue';
import Login from '../pages/login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
  const { auth } = store.state;

  // if (!auth.publicPages.includes(to) && !auth.payload) {
  //   return redirect('/login');
  // }

  if (!['login', 'signup'].includes(to.name) && !auth.payload) {
    try {
      const authRes = await store.dispatch('auth/authenticate');
      console.log('authRes:', authRes);

      return next();
    } catch (error) {
      console.error('Router.beforeEach. Auth hook error:', error);
      if (error.message === 'No accessToken found in storage') {
        return next('/login');
      }
      // debugger;
    }
  }

  return next();
});

export default router;
