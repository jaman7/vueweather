<template>
	<div class="item">
		<div class="item-row smallitem">
			<Spann :item="dayOfWeek(item.dt)" />
		</div>

		<div class="item-row smallitem">
			<img class="img-fluid raindrop" src="img/raindrop.svg" alt="Raindrop" />
			<Spann :item="`${item.humidity}%`" />
		</div>

		<div class="item-row smallitem">
			<IconWeater :iconid="item.weather[0].id" />
		</div>

		<div class="item-row bigitem">
			<ProgressBar :tday="Math.floor(item.temp.day * 1) / 1" />
		</div>

		<div class="item-row smallitem">
			<Spann :item="`${Math.floor(item.temp.day * 1) / 1}°C`" />
		</div>
	</div>
</template>

<script>
import Spann from '../single_componets/span';
import IconWeater from '../view/IconWeater';
import ProgressBar from '../view/progressBar';

import DAYS from '../../helpers/days';

export default {
	name: 'DailyItems',
	props: { item: Object },
	components: { Spann, IconWeater, ProgressBar },
	data() {
		return { DAYS };
	},
	methods: {
		dayOfWeek(utc) {
			const time = new Date(utc * 1000);
			return this.DAYS[time.getDay()];
		}
	},
	computed: {}
};
</script>