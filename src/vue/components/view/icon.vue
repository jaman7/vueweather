<template>
	<svg class="icon" :class="className">
		<use v-bind:xlink:href="`${href}`" />
	</svg>
</template>

<script>
export default {
	name: 'Icon',
	props: {
		name: String
	},
	data() {
		return {
			className: `img/icons.svg#${this.name}`,
			href: `img/icons.svg#${this.name}`
		};
	}
};
</script>

<style scoped>
.icon {
	display: inline-block;
	width: 2em;
	height: 2em;
	/* fill: currentColor; */
	stroke: none;
	vertical-align: middle;
}
</style>