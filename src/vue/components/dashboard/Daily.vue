<template>
	<div class="row">
		<div class="col-12">
			<h2>Daily Weather</h2>
			<div class="daily-list mt-5">
				<div
					v-for="(item , index ) in currentDailyWeather.slice(1,currentDailyWeather.length)"
					:key="`daily-${index}`"
					class="item-row"
				>
					<div class="item smallitem">
						<span>{{ dayOfWeek(item.dt)}}</span>
					</div>

					<div class="item smallitem">
						<img class="img-fluid raindrop" src="img/raindrop.svg" alt="Raindrop" />
						<span>{{ item.humidity }}%</span>
					</div>

					<div class="item smallitem">
						<IconWeater :key="$uuid.v1()" :iconid="item.weather[0].id" />
					</div>

					<div class="item bigitem">
						<ProgressBar :key="$uuid.v1()" :tday="Math.floor(item.temp.day * 1) / 1" />
					</div>

					<div class="item smallitem">
						<span>{{ Math.floor(item.temp.day * 1) / 1 }}°C</span>
					</div>

					<div class="item miditem">
						<WindDir :windSpeed="item.wind_speed" :windDir="item.wind_deg" />
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- <div>{{currentWeather}}</div> -->
</template>

<script>
import IconWeater from '../view/IconWeater';
import ProgressBar from '../view/progressBar';
import WindDir from '../view/WindDir';

export default {
	name: 'Daily',
	components: {
		IconWeater,
		ProgressBar,
		WindDir
	},
	data() {
		return {
			red: 'red',
			blue: 'blue'
		};
	},
	created() {},
	mounted() {},
	methods: {
		dayOfWeek(utc) {
			const time = new Date(utc * 1000);
			return this.user.days[time.getDay()];
		}
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
		currentDailyWeather() {
			return this.$store.getters.getDailyWeather;
		}
	}
};
</script>