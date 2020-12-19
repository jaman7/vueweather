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
			<h2 class="siedebar-title-state">hourly Weather temp</h2>
			<div class="hourly mt-2">
				<div
					v-for="(item , index ) in getHourlyWeather.slice(0,6)"
					:key="`hourly-${index}`"
					class="item"
				>
					<span>{{ item.main.temp }}°C</span>
					<ProgressBar :key="$uuid.v1()" :tday="item.main.temp" :styleclass="progressclassvertical" />

					<span>{{ timeOfDay(item.dt)}} {{ item.dt_txt.slice(5, 7) }}.{{ item.dt_txt.slice(8, 10) }}</span>
				</div>
			</div>
		</div>
	</div>
</template>



<script>
import Dropdown from './dropdown';
import IconWeater from '../view/IconWeater';
import WindDir from '../view/WindDir';
import ProgressBar from '../view/progressBar';

export default {
	name: 'sideBar',
	components: {
		Dropdown,
		IconWeater,
		ProgressBar,
		WindDir
	},
	data() {
		return {
			progressclassvertical: 'progress-bar-vertical'
		};
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
		},
		timeOfDay(utc) {
			return new Date(utc * 1000).toLocaleTimeString().slice(0, 5);
		}
	}
};
</script>
