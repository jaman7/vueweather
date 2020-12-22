<template>
	<div class="footer">
		<button class="btn refresh" title="Refresh" @click="fetchWeather">
			<div class="btn-refresh__content" v-if="currentWeather">
				<img src="img/refresh.svg" alt="refresh" class="img-fluid icon-refresh" />
				<span>{{ timerclock }} Last updated: {{ timestamp(currentWeather.dt)}}</span>
			</div>
		</button>
	</div>
</template>

<script>
export default {
	name: 'Footer',
	data() {
		return { timerclock: 60 };
	},
	created() {
		this.timer();
	},
	methods: {
		fetchWeather() {
			this.$store.dispatch('Retrieve_Weather', {
				name: this.getCurrentCity.name,
				lat: this.getCurrentCity.lat,
				lon: this.getCurrentCity.lon
			});
			this.timerclock = 60;
		},
		timestamp(time) {
			const currenttime = new Date(time * 1000).toLocaleTimeString().slice(0, 5);
			return currenttime;
		},
		timer() {
			setInterval(() => {
				this.timerclock -= 1;
				if (this.timerclock < 0) {
					this.timerclock = 60;
					this.$store.dispatch('Retrieve_Weather', {
						name: this.getCurrentCity.name,
						lat: this.getCurrentCity.lat,
						lon: this.getCurrentCity.lon
					});
				}
			}, 1000);
		}
	},
	computed: {
		getCurrentCity() {
			return this.$store.getters.currentcitydata;
		},
		currentWeather() {
			return this.$store.getters.getCurrentWeather;
		}
	}
};
</script>