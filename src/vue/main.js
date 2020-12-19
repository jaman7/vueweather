import Vue from 'vue';
import UUID from 'vue-uuid';

import store from './store';
import router from './router';
import App from './App';

Vue.use(UUID);

(() =>
	new Vue({
		el: '#root',
		router,
		store,
		render: (h) => h(App)
	}))();
