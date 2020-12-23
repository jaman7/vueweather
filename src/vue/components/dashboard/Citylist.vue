<template>
	<div class="row">
		<div class="col-12">
			<div class="d-flex justify-content-between">
				<h2>
					Weather
					<span>Forecast</span>
				</h2>

				<BtnRefresh />
			</div>

			<div class="city mt-5">
				<ul class="city-list">
					<li
						v-for="(item, i ) in getCity"
						:class="{ active: item.id_city === getCurrentCity.id_city}"
						class="item"
						:key="`list-no-${i}`"
						@click="handelSetCurrentCity(item, i)"
					>
						<img class="img-fluid" src="img/city.svg" :alt="item.name" />
						<span>{{ item.name }}, {{ item.country }}</span>
						<ButtonRemove :id="item._id" :key="`btn-no-${i}`" :cityid="item.id_city" />
						<Checked
							v-if="item.active"
							:id="item._id"
							:key="`check-yes-${i}`"
							:name="'yes-'+item.id_city"
							:className="'fas fa-check checked'"
						/>
						<Checked
							v-if="!item.active"
							:id="item._id"
							:key="`check-no-${i}`"
							:name="'no-'+item.id_city"
							:className="'far fa-square checked'"
						/>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BtnRefresh from './BtnRefresh';
import ButtonRemove from '../view/ButtonRemove';
import Checked from '../view/checked';

export default {
	name: 'Citylist',
	components: {
		ButtonRemove,
		Checked,
		BtnRefresh
	},
	data() {
		return {
			activeItem: null,
			currentItem: null,
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
			}
		};
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
		handelSetCurrentCity(result, i) {
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