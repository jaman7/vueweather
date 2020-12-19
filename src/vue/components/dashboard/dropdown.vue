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
			<span>{{ selectedItem }}</span>
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
// import ButtonRemove from './ButtonRemove';

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
		}
	},
	computed: {
		auth() {
			return this.$store.getters.ifAuthenticated;
		},
		getCity() {
			return this.$store.getters.citydata;
		}
	}
};
</script>
