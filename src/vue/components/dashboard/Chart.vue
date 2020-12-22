<template>
	<div class="weather-chart">
		<line-chart
			:colors="['#a0c5e8', '#202b5c']"
			height="150px"
			:data="getacharData"
			suffix="°C"
			label="Temperature"
			:messages="{empty: 'Select specific day to see temperature during the day'}"
		></line-chart>
	</div>
</template>

<script>
export default {
	name: 'Chart',
	data() {
		return {
			chartData: this.setDataChart
		};
	},
	methods: {
		timeOfDay(utc) {
			return new Date(utc * 1000).toLocaleTimeString().slice(0, 5);
		}
	},
	computed: {
		getHourlyWeather() {
			return this.$store.getters.getHourlyWeather;
		},
		getacharData() {
			const datachart = this.getHourlyWeather
				.slice(0, 8)
				.map((item) => [this.timeOfDay(item.dt), Math.round((item.main.temp_max + item.main.temp_min) / 2)]);
			return datachart;
		}
	}
};
</script>

<style scoped>
.weather-chart {
	margin-top: 30px;
}
</style>