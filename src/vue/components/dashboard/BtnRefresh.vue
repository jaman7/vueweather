<template>
	<button class="btn refresh" title="Refresh" @click="fetchWeather">
		<div class="refresh__content" v-if="currentWeather">
			<img src="img/refresh.svg" alt="refresh" class="img-fluid icon-refresh" />
			<span class="timer">{{ clock }}</span>
			<span class="text">Last updated:</span>
			<span class="time">{{ timestamp(currentWeather.dt)}}</span>
		</div>
	</button>
</template>

<script>
export default {
	name: 'BtnRefresh',
	data() {
		return { timerclock: 0, limit: 360, clock: 0 };
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
			this.timerclock = this.limit;
		},
		timestamp(time) {
			const currenttime = new Date(time * 1000).toLocaleTimeString().slice(0, 5);
			return currenttime;
		},
		sToTimeString(s) {
			let seconds = (s / 1) % 60;
			let minutes = Math.floor(s / 1 / 60) % 60;
			seconds = `${seconds}`.slice(-2);
			minutes = `${minutes}`.slice(-2);
			return `${minutes}:${seconds}`;
		},
		timer() {
			setInterval(() => {
				this.timerclock -= 1;
				this.clock = this.sToTimeString(this.timerclock);
				if (this.timerclock < 0) {
					this.timerclock = this.limit;
					this.clock = this.sToTimeString(this.limit);
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