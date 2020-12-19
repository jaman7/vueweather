<template>
	<div class="progress">
		<div
			class="progress-bar bg-info"
			:class="classprogress"
			role="progressbar"
			:style="stylewidth"
			:aria-valuenow="datatemp"
			aria-valuemin="0"
			aria-valuemax="100"
		></div>
	</div>
</template>

<script>
export default {
	name: 'ProgressBar',
	props: {
		tday: Number
	},
	data() {
		return {
			datatemp: this.toPositive(this.tday),
			stylewidth: `width: ${this.toPositive(this.tday)}%`,
			classprogress: this.negative(this.tday) ? 'blue' : 'red'
		};
	},
	methods: {
		negative(number) {
			return !Object.is(Math.abs(number), +number);
		},
		toPositive(number) {
			return Math.abs(Math.floor(number - -30 * 1.6) / 1);
		}
	}
};
</script>