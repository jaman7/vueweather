import Vue from 'vue';

import Chartkick from 'vue-chartkick';
import Chart from 'chart.js';
import router from './router';
import store from './store';

import App from './App';

Vue.use(Chartkick.use(Chart));

(() =>
	new Vue({
		el: '#root',
		router,
		store,
		render: (h) => h(App)
	}))();
