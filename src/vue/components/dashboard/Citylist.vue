<template>
	<div class="row">
		<div class="col-12">
			<h2>
				Weather
				<span>Forecast</span>
			</h2>
			<div class="city mt-5">
				<ul class="city-list">
					<li
						v-for="(item, i ) in getCity"
						:class="{ active: i === activeItem || item.active}"
						class="item"
						:key="`list-${item.id_city}`"
						@click="searchSetCurrentCity(item, i)"
					>
						<img class="img-fluid" src="img/city.svg" :alt="item.name" />
						<span>{{ item.name }}, {{ item.country }}</span>
						<ButtonRemove :id="item._id" :key="$uuid.v4()" :cityid="item.id_city" />
						<Checked v-if="i === activeItem || item.active" :key="$uuid.v4()" :cityid="item.id_city" />
					</li>
				</ul>
				<p>left refresh: {{ timerclock }}</p>
			</div>
		</div>
	</div>
</template>

<script>
import ButtonRemove from '../view/ButtonRemove';
import Checked from '../view/checked';

export default {
	name: 'Citylist',
	components: {
		ButtonRemove,
		Checked
	},
	data() {
		return {
			activeItem: null,
			last: {
				_id: ''
			},
			defaultcity: {
				name: 'Warszawa',
				country: 'PL',
				id_city: 6695624,
				lat: 52.23547,
				lon: 21.04191,
				active: true
			},
			polling: null,
			timerclock: 60
		};
	},
	created() {
		this.timer();
	},
	updated() {
		if (this.citysIsLoad && this.getCity.length) {
			const data = this.getCity;
			const favActiveCity = data.filter((item) => item.active === true);
			this.SetCurrentCity(favActiveCity[0]);
			this.$store.dispatch('citysIsLoad', this.citysIsLoad);
		}
	},
	mounted() {
		const data = this.getCity;
		const lastActiveCity = data.filter((item) => item.active === true);
		if (lastActiveCity.length) {
			this.SetCurrentCity(lastActiveCity[0]);
		} else {
			this.SetCurrentCity(this.defaultcity);
		}
	},
	methods: {
		SetCurrentCity(city) {
			const { name, lat, lon } = city;
			this.$store.dispatch('setCurrentCity', city);
			this.$nextTick(() => {
				this.$store.dispatch('Retrieve_Weather', { name, lat, lon });
			});
		},
		searchSetCurrentCity(result, i) {
			const city = {
				_id: result._id,
				name: result.name,
				id_city: result.id_city,
				country: result.country,
				lat: result.lat,
				lon: result.lon,
				active: result.active
			};

			this.activeItem = i;

			const Citylist = this.getCity;
			const lastActiveCity = Citylist.filter((item) => item.active === true);

			if (lastActiveCity.length) {
				this.last = {
					_id: lastActiveCity[0]._id
				};
			}

			this.$store.dispatch('setCurrentCity', city);
			this.$store.dispatch('Retrieve_Weather', { name: city.name, lat: city.lat, lon: city.lon });
			const payload = { current: { _id: result._id, index: i }, last: this.last };
			this.$store.dispatch('setFavCityActive', payload);
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
		getCity() {
			return this.$store.getters.citydata;
		},
		getCurrentCity() {
			return this.$store.getters.currentcitydata;
		},
		citysIsLoad() {
			return this.$store.getters.citysIsLoad;
		}
	}
};
</script>