/* eslint-disable no-unused-vars */
/* eslint-disable no-bitwise */
/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import hash from 'hash-it';
import router from './router';
import restdbInstance from './api/resetdbAPI';
import weatherInstance from './api/weatherAPI';

import DAYS from './helpers/days';
import MONTHS from './helpers/months';

// weather sets api
const WEATHER_APIKEY = process.env.WEATHER_API;
const urloptions = `&APPID=${WEATHER_APIKEY}&units=metric`;

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoading: true,
		idToken: null,
		userId: null,
		user: null,
		error: null,
		citysIsLoad: false,
		city: [],
		currentCity: [],
		currentWeather: [],
		dailyWeather: [],
		hourlyWeather: []
	},
	mutations: {
		loading(state, loading) {
			state.isLoading = loading;
		},
		authUser(state, userData) {
			state.idToken = userData.idToken;
			state.userId = userData.userId;
			state.user = userData.user;
			state.error = userData.error;
		},
		clearAuth(state) {
			state.idToken = null;
			state.userId = null;
			state.user = null;
			state.error = null;
			state.city = [];
		},
		citysIsLoad(state, load) {
			state.citysIsLoad = load;
		},
		allCity(state, AllCity) {
			state.city = AllCity;
		},
		addCity(state, AddCity) {
			state.city.push(AddCity);
		},
		addCurrentCity(state, AddCity) {
			state.currentCity = AddCity;
		},
		clearCity(state, cityId) {
			const index = state.city.findIndex((item) => item._id === cityId);
			state.city.splice(index, 1);
		},
		changeActiveCity(state, city) {
			const { last, current } = city;
			if (last._id !== '') {
				const index = state.city.findIndex((item) => item._id === last._id);
				state.city[index].active = false;
			}
			const currentIndex = state.city.findIndex((item) => item._id === current._id);
			state.city[currentIndex].active = true;
		},
		addCurrentWeather(state, weather) {
			state.currentWeather = weather;
		},
		addDailyWeather(state, weather) {
			state.dailyWeather = weather;
		},
		addHourlyWeather(state, weather) {
			state.hourlyWeather = weather;
		}
	},

	actions: {
		citysIsLoad({ commit }, load) {
			commit('citysIsLoad', !load);
		},
		logout({ commit }, authData) {
			commit('clearAuth');
			localStorage.removeItem('idToken');
			localStorage.removeItem('userId');
			localStorage.removeItem('user');
			router.replace('/');
		},
		async signup({ commit }, authData) {
			await restdbInstance
				.post('usersdb', {
					email: authData.email,
					pass: authData.password,
					name: authData.name,
					idToken: hash(authData.email + authData.password),
					returnSecureToken: true
				})
				.then((res) => {
					localStorage.setItem('idToken', res.data.idToken);
					localStorage.setItem('userId', res.data._id);
					localStorage.setItem('user', res.data.name);
					commit('authUser', {
						idToken: res.data.idToken,
						userId: res.data._id,
						user: res.data.name,
						error: null
					});

					router.push('/dashboard');
				})
				.catch((error) => console.log(error));
		},
		async login({ commit }, authData) {
			commit('loading', true);

			await restdbInstance
				.get(`usersdb?q={"email":"${authData.email}","pass":"${authData.password}"}`)
				.then((res) => {
					if (
						typeof res.data !== 'undefined' &&
						res.data.length > 0 &&
						authData.email === res.data[0].email &&
						authData.password === res.data[0].pass &&
						hash(authData.email + authData.password) === res.data[0].idToken
					) {
						localStorage.setItem('idToken', res.data[0].idToken);
						localStorage.setItem('userId', res.data[0]._id);
						localStorage.setItem('user', res.data[0].name);

						commit('authUser', {
							idToken: res.data[0].idToken,
							userId: res.data[0]._id,
							user: res.data[0].name,
							error: null
						});

						const promiseCity = restdbInstance.get(`usersdb/${res.data[0]._id}/city`);
						Promise.all([promiseCity]).then(
							axios.spread((city) => {
								commit('allCity', city.data);
							})
						);

						router.push('/dashboard');
						commit('citysIsLoad', true);
						commit('loading', false);
					} else {
						localStorage.removeItem('idToken');
						localStorage.removeItem('userId');
						localStorage.removeItem('user');

						commit('authUser', {
							idToken: null,
							userId: null,
							user: null,
							error: 'wrong email or password'
						});
					}
				})
				.catch((error) => console.log(error));
		},

		async AutoLogin({ commit }) {
			commit('loading', true);

			const idToken = localStorage.getItem('idToken');
			if (!idToken) {
				return;
			}
			const userId = localStorage.getItem('userId');
			const user = localStorage.getItem('user');

			await axios.all([restdbInstance.get(`usersdb?q={"idToken":${idToken}}`), restdbInstance.get(`usersdb/${userId}/city`)]).then(
				axios.spread((res1, res2) => {
					if (parseInt(idToken, 10) === res1.data[0].idToken) {
						commit('authUser', {
							idToken,
							userId,
							user,
							error: null
						});

						if (idToken && userId && user) {
							router.push('/dashboard');
						}
						commit('allCity', res2.data);
						commit('loading', false);
					} else {
						commit('authUser', {
							idToken: null,
							userId: null,
							user: null,
							error: 'error login'
						});
						commit('loading', false);
					}
				})
			);
		},
		async setAddCity({ commit }, cityData) {
			const city = {
				user_id: this.state.userId,
				name: cityData.name,
				country: cityData.country,
				id_city: cityData.id_city,
				lat: cityData.lat,
				lon: cityData.lon,
				active: false
			};

			await restdbInstance
				.post(`usersdb/${this.state.userId}/city`, city)
				.then((res) => {
					const newcity = {
						...city,
						_id: res.data._id
					};
					commit('addCity', newcity);
				})
				.catch((error) => console.log(error));
		},
		async delCity({ commit }, cityid) {
			commit('clearCity', cityid);
			await restdbInstance.delete(`cities/${cityid}`).catch((error) => console.log(error));
		},
		setCurrentCity({ commit }, current) {
			const city = {
				name: current.name,
				country: current.country,
				id_city: current.id_city,
				lat: current.lat,
				lon: current.lon,
				active: true
			};

			commit('addCurrentCity', city);
		},
		async setFavCityActive({ commit }, payload) {
			const { current, last } = payload;

			commit('changeActiveCity', { last, current });

			if (last._id !== '') {
				restdbInstance.patch(`cities/${last._id}`, {
					active: false
				});
			}
			await restdbInstance.patch(`cities/${current._id}`, {
				active: true
			});
		},
		async Retrieve_Weather({ commit }, city) {
			try {
				commit('loading', true);

				const { name, lat, lon } = city;

				const weather = await weatherInstance.get(`weather?q=${name}${urloptions}`);
				const forecast7 = await weatherInstance.get(
					`onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${WEATHER_APIKEY}`
				);
				const forecast = await weatherInstance.get(`forecast?q=${name}${urloptions}`);

				const weatherRequests = weather.data;
				const forecastRequests7 = forecast7.data;
				const forecastRequests = forecast.data;

				const weatherAll = await Promise.all([weatherRequests, forecastRequests7, forecastRequests]);

				const currentDate = new Date();
				const date = `${DAYS[currentDate.getDay()]} ${currentDate.getDate()}, ${MONTHS[currentDate.getMonth()]}`;
				const sunset = new Date(weatherAll[0].sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
				const sunrise = new Date(weatherAll[0].sunrise * 1000).toLocaleTimeString().slice(0, 5);

				const WeatherData = {
					city: weatherAll[0].name,
					country: weatherAll[0].sys.country,
					date,
					feels_like: weatherAll[0].main.feels_like,
					humidity: weatherAll[0].main.humidity,
					pressure: weatherAll[0].main.pressure,
					temp: weatherAll[0].main.temp,
					temp_max: weatherAll[0].main.temp_max,
					temp_min: weatherAll[0].main.temp_min,
					id: weatherAll[0].id,
					sunrise,
					sunset,
					clouds: weatherAll[0].clouds.all,
					wind_speed: weatherAll[0].wind.speed,
					wind_deg: weatherAll[0].wind.deg,
					cod: weatherAll[0].cod,
					lat: weatherAll[0].coord.lat,
					lon: weatherAll[0].coord.lon,
					dt: weatherAll[0].dt,
					weather_description: weatherAll[0].weather[0].description,
					weather_icon: weatherAll[0].weather[0].icon,
					weather_id: weatherAll[0].weather[0].id,
					weather_main: weatherAll[0].weather[0].main
					// forecast: weatherAll[1].list,
				};

				commit('addCurrentWeather', WeatherData);
				commit('addDailyWeather', weatherAll[1].daily);
				commit('addHourlyWeather', weatherAll[2].list);

				commit('loading', false);
			} catch (error) {
				console.log(error);
			}
		}
	},
	getters: {
		user(state) {
			return state;
		},
		errorMsg(state) {
			return state.error;
		},
		ifisLoading(state) {
			return state.isLoading;
		},
		ifErrorLogin(state) {
			return state.error !== null;
		},
		ifAuthenticated(state) {
			return state.idToken !== null;
		},
		citysIsLoad(state) {
			return state.citysIsLoad;
		},
		citydata(state) {
			return state.city;
		},
		currentcitydata(state) {
			return state.currentCity;
		},
		getCurrentWeather(state) {
			return state.currentWeather;
		},
		getDailyWeather(state) {
			return state.dailyWeather;
		},
		getHourlyWeather(state) {
			return state.hourlyWeather;
		}
	}
});
