<template>
	<!-- <app-header /> -->
	<router-view></router-view>
</template>

<script>
export default {
	name: 'App',
	// components: {
	// 	'app-header': Header
	// },
	created() {
		this.$store.dispatch('AutoLogin');
	}
};
</script>
