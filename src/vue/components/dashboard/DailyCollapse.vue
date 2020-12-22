<template>
	<div class="forecast-daily">
		<div v-for="(itemCollapse , i ) in IsItem" :key="i" class="forecast-daily__item">
			<Icon v-if="itemCollapse.icon" :name="itemCollapse.icon" />
			<div class="text--truncate">
				<span v-if="itemCollapse.span1">{{ itemCollapse.span1 }}</span>
				<span v-if="itemCollapse.span2" class="d-flex align-items-center">
					{{ itemCollapse.span2 }}
					<div v-if="itemCollapse.dot" class="dot" :style="itemCollapse.dot"></div>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mileToKilometer, deriveWindDir } from '../../helpers/helpers';
import UV_INDEX from '../../helpers/uv-index';

import Icon from '../view/icon';

export default {
	name: 'DailyCollapse',
	props: { item: Object },
	components: { Icon },
	data() {
		return {
			UV_INDEX
		};
	},
	methods: {
		mileToKilometer,
		deriveWindDir,
		getUvIndexDotStyle(uvIndex) {
			const { colour } = UV_INDEX.slice()
				.reverse()
				.find(({ start }) => uvIndex >= start);
			return {
				backgroundColor: colour
			};
		}
	},
	computed: {
		IsItem() {
			const items = [
				{
					icon: 'temp-cold-line',
					span1: 'Temp Min',
					span2: `${this.item.temp.min}°C`,
					dot: null
				},
				{
					icon: 'temp-hot-line',
					span1: 'Temp Max',
					span2: `${this.item.temp.max}°C`,
					dot: null
				},
				{
					icon: 'windy-line',
					span1: 'Wind Speed',
					span2: `${this.mileToKilometer(this.item.wind_speed)}km/h`,
					dot: null
				},
				{
					icon: 'compass-3-line',
					span1: 'Wind Direction',
					span2: this.deriveWindDir(this.item.wind_deg),
					dot: null
				},
				{
					icon: 'swap-line',
					span1: 'Pressure',
					span2: `${this.item.pressure}hPa`,
					dot: null
				},
				{
					icon: 'cloudy-line',
					span1: 'Cloud Coverage',
					span2: `${this.item.clouds}%`,
					dot: null
				},
				{
					icon: 'sun-line',
					span1: 'UV Index',
					span2: this.item.uvi,
					dot: this.getUvIndexDotStyle(this.item.uvi)
				}
			];
			return items;
		}
	}
};
</script>