<template>
	<div class="row findcity">
		<div class="col-12">
			<div class="d-flex align-items-center mt-4 saarch-col">
				<div class="flex-fill item">
					<Autocomplete
						:search="search"
						placeholder="Search city"
						aria-label="Search city"
						:get-result-value="getResultValue"
						@submit="onSubmit"
					></Autocomplete>
				</div>

				<div class="flex-fill item">
					<button class="btn btn-link" @click="addFavorites">Add city to favorites</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';

import Autocomplete from '@trevoreyre/autocomplete-vue';

const MAPBOX_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const MAPBOX_SET = `.json?limit=5&language=pl-PL&access_token=${process.env.MAPBOX_API}`;

Vue.use(Autocomplete);
export default {
	name: 'FindCity',
	components: {
		Autocomplete
	},
	computed: {
		getCity() {
			return this.$store.getters.citydata;
		},
		getCurrentCity() {
			return this.$store.getters.currentcitydata;
		}
	},
	methods: {
		search(input) {
			const url = MAPBOX_URL + encodeURI(input) + MAPBOX_SET;
			this.value = input;
			return new Promise((resolve) => {
				if (input.length < 3) {
					return resolve([]);
				}
				return fetch(url)
					.then((response) => response.json())
					.then((data) => {
						return resolve(data.features);
					});
			});
		},
		getLang(query) {
			const last = query.slice(-1);
			return last[0].short_code.toUpperCase();
		},
		getResultValue(result) {
			return `${result.text}, ${this.getLang(result.context)}`;
		},
		// eslint-disable-next-line no-unused-vars
		onSubmit(result) {
			const city = {
				name: result.text,
				id_city: result.id,
				country: this.getLang(result.context),
				lat: result.geometry.coordinates[1],
				lon: result.geometry.coordinates[0],
				active: true
			};

			this.$store.dispatch('setCurrentCity', city);
			this.$store.dispatch('Retrieve_Weather', { name: city.name, lat: city.lat, lon: city.lon });
		},
		addFavorites() {
			this.$store.dispatch('setAddCity', this.$store.getters.currentcitydata);
		}
	}
};
</script>