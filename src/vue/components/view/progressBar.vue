<template>
	<div class="progress" :class="addclass">
		<div
			class="progress-bar bg-info"
			:class="classprogress"
			role="progressbar"
			:style="style"
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
		tday: Number,
		styleclass: String
	},
	data() {
		return {
			datatemp: this.toPositive(this.tday),
			style: this.styleclass ? `height: ${this.toPositive(this.tday)}%` : `width: ${this.toPositive(this.tday)}%`,
			classprogress: this.negative(this.tday) ? 'blue' : 'red',
			addclass: this.styleclass || null
		};
	},
	methods: {
		negative(number) {
			console.log(!Object.is(Math.abs(number), +number));
			return !Object.is(Math.abs(number), +number);
		},
		toPositive(number) {
			return Math.abs(Math.floor(number - -30 * 1.6) / 1);
		}
	}
};
</script>