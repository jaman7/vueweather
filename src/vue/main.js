import Vue from 'vue';
import UUID from 'vue-uuid';
import DisableAutocomplete from '@aacassandra/vue-disable-autocomplete';

import store from './store';
import router from './router';
import App from './App';

Vue.use(UUID);
Vue.use(DisableAutocomplete);

(() =>
	new Vue({
		el: '#root',
		router,
		store,
		render: (h) => h(App)
	}))();
