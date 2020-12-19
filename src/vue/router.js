/* eslint-disable import/no-cycle */

import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store';
import WelcomePage from './components/welcome';
import DashboardPage from './components/dashboard/dashboard';
import SignupPage from './components/auth/signup';
import SigninPage from './components/auth/signin';

Vue.use(VueRouter);

const routes = [
	{ path: '/', component: WelcomePage },
	{ path: '/signup', component: SignupPage },
	{ path: '/signin', component: SigninPage },
	{
		path: '/dashboard',
		component: DashboardPage,
		beforeEnter(to, from, next) {
			// console.log(store.state.idToken);
			if (store.state.idToken) {
				next();
			} else {
				next('/signin');
			}
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: '/vueweather2/src',
	routes
});

export default router;
