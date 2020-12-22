<template>
	<i :class="icon" role="presentation" :aria-label="title"></i>
</template>

<script>
export default {
	name: 'IconWeater',
	props: {
		iconid: Number
	},
	data() {
		return {
			title: `IconWeater`,
			icon: `icon wi wi-owm-${this.string(this.iconid)}`
		};
	},
	methods: {
		string(item) {
			return String(item);
		}
	}
};
</script>