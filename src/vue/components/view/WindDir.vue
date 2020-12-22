<template>
	<div class="wind d-flex justify-content-between w-100">
		<div class="direction d-flex flex-grow-1 align-items-center">
			<img src="img/winddirection.svg" alt="winddirection" class="img-fluid mr-1" />
			<p class="mb-0">{{ deriveWindDir(windDir) }}</p>
		</div>

		<div class="speed d-flex flex-grow-1 align-items-center">
			<img src="img/windspeed.svg" alt="windspeed" class="img-fluid mr-1" />
			<p class="mb-0">
				{{ mileToKilometer(windSpeed) }}
				<span>km/h</span>
			</p>
		</div>
	</div>
</template>

<script>
import { mileToKilometer, deriveWindDir } from '../../helpers/helpers';

export default {
	name: 'WindDir',
	props: {
		windSpeed: Number,
		windDir: Number
	},
	data() {
		return {};
	},
	methods: {
		mileToKilometer,
		deriveWindDir
	},
	computed: {}
};
</script>