<template>
	<i role="presentation" :aria-label="title" :title="title" class="fas fa-check checked" />
</template>

<script>
export default {
	name: 'Checked',
	props: {
		cityid: String
	},
	data() {
		return {
			title: `checked:${this.cityid}`
		};
	}
};
</script>