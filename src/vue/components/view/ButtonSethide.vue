<template>
	<button
		type="button"
		id="sidebarCollapse"
		class="btn text-sidebar bg-turbo-yellow"
		@click="toggle()"
		:class="{active: stateSidebarClick}"
	>
		<i class="fas fa-align-left"></i>
	</button>
</template>

<script>
export default {
	name: 'ButtonSethide',
	data() {
		return {
			isActive: true
		};
	},
	computed: {
		stateSidebarClick() {
			return this.$store.getters.stateSidebarClick;
		}
	},
	methods: {
		toggle() {
			this.isActive = !this.isActive;
			this.$store.dispatch('toggleSidebar', this.isActive);
		}
	}
};
</script>