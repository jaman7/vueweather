<template>
	<div class="row">
		<ul class="nav w-100 nav-justified nav-users mt-4">
			<Dropdown :key="$uuid.v4()" />
			<li class="nav-item dropdown">
				<a
					href="#"
					role="button"
					id="dropdownMenuLink2"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
					class="btn btn-secondary dropdown-toggle"
				>
					<span>{{ user.user }}</span>
					<img src="img/user.png" alt="user" class="img-fluid user-logo" />
				</a>
				<div aria-labelledby="dropdownMenuLink2" class="dropdown-menu">
					<a @click="onLogout" href="#" class="dropdown-item">Log Out</a>
				</div>
			</li>
		</ul>
		<div class="col-12 box-title">
			<div class="boxinfo-row">
				<div class="boxinfo-col text-center">
					<IconWeater :key="$uuid.v4()" :iconid="currentWeather.weather_id" />
					<h4>{{ currentWeather.weather_main }}</h4>
				</div>

				<div class="boxinfo-col">
					<h3>Today</h3>
					<h4>{{ currentWeather.date }}</h4>
				</div>
			</div>
			<div class="d-flex flex-column">
				<H3 class="boxinfo-temp">
					{{Math.floor(currentWeather.temp)}}
					<span>°C</span>
				</H3>

				<h4 class="boxinfo-feel">RealFeel®{{ currentWeather.feels_like }}°C</h4>

				<H3 class="boxinfo-city">{{ currentWeather.city }}, {{ currentWeather.country }}</H3>

				<div class="temp-max-min">
					<div class="item">
						<i class="red">▲</i>
						{{ currentWeather.temp_max }}
						<span>°C</span>
					</div>
					<div class="item">
						<i class="blue">▼</i>
						{{ currentWeather.temp_min }}
						<span>°C</span>
					</div>
				</div>

				<WindDir :windSpeed="currentWeather.wind_speed" :windDir="currentWeather.wind_deg" />

				<H3 class="boxinfo-sunset">sunset: {{currentWeather.sunset}}</H3>
			</div>
		</div>
		<div class="col-12">
			<temp-var-chart :tempVar="getHourlyWeather"></temp-var-chart>
		</div>
	</div>
</template>



<script>
import Dropdown from './dropdown';
import IconWeater from '../view/IconWeater';
import WindDir from '../view/WindDir';

export default {
	name: 'sideBar',
	components: {
		Dropdown,
		IconWeater,
		WindDir
	},
	computed: {
		auth() {
			return this.$store.getters.ifAuthenticated;
		},
		user() {
			return this.$store.getters.user;
		},
		currentWeather() {
			return this.$store.getters.getCurrentWeather;
		},
		getCurrentCity() {
			return this.$store.getters.currentcitydata;
		},
		getHourlyWeather() {
			return this.$store.getters.getHourlyWeather;
		}
	},

	methods: {
		onLogout() {
			this.$store.dispatch('logout');
		}
	}
};
</script>
