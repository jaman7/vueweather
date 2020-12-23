<template>
	<li v-if="auth" class="nav-item dropdown">
		<a
			class="btn btn-secondary dropdown-toggle"
			href="#"
			role="button"
			id="dropdownMenuLink"
			data-toggle="dropdown"
			aria-haspopup="true"
			aria-expanded="false"
		>
			<span>{{ getNameCountry }}</span>
		</a>
		<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
			<a
				:key="index"
				class="dropdown-item"
				href="#"
				v-for="(item, index) in getCity"
				@click="selected(item)"
			>{{ item.name }}, {{ item.country }}</a>
		</div>
	</li>
</template>

<script>
export default {
	name: 'Dropdown',
	data() {
		return {
			selectedItem: 'Places'
		};
	},

	methods: {
		selected(element) {
			const city = {
				country: element.country,
				id_city: element.id_city,
				lat: element.lat,
				lon: element.lon,
				name: element.name
			};
			this.selectedItem = `${element.name}, ${element.country}`;
			this.$store.dispatch('setCurrentCity', city);
			this.$store.dispatch('Retrieve_Weather', { name: city.name, lat: city.lat, lon: city.lon });
		}
	},
	computed: {
		auth() {
			return this.$store.getters.ifAuthenticated;
		},
		getCity() {
			return this.$store.getters.citydata;
		},
		getCurrentCity() {
			return this.$store.getters.currentcitydata;
		},
		citysIsLoad() {
			return this.$store.getters.citysIsLoad;
		},
		getNameCountry() {
			const allCity = this.getCity;
			const currentCity = this.getCurrentCity;
			const comparedCity = allCity.filter((item) => item.id_city === currentCity.id_city);

			if (comparedCity.length > 0) {
				return `${comparedCity[0].name}, ${comparedCity[0].country}`;
			}
			return this.selectedItem;
		}
	}
};
</script>
