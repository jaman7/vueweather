<template>
	<i
		role="presentation"
		:aria-label="title"
		:title="title"
		@click="Handleremove"
		class="fas fa-trash-alt remove-item"
	/>
</template>

<script>
export default {
	name: 'ButtonRemove',
	props: {
		cityid: Number,
		id: String
	},
	data() {
		return {
			title: `Remove city ID:${this.cityid}`
		};
	},
	methods: {
		Handleremove() {
			this.$store.dispatch('delCity', this.id);
		}
	},
	computed: {}
};
</script>