
<template>
	<div class="container-fluid main-wrapper">
		<div class="row flex-xl-nowrap">
			<div class="col-12 col-md-9 col-xl-8 order-2 order-md-1 bg-content">
				<FindCity />
				<Citylist />

				<Daily />

				<!-- <div v-if="isLoading" class="col-12 container-react-logo" role="presentation">
					<span class="react-logo" role="presentation">
						<span class="nucleo" role="presentation" />
					</span>
				</div>

				<p v-if="!isLoading">{{ currentWeather }}</p>-->
			</div>
			<div class="col-12 col-md-3 col-xl-4 order-1 order-md-2 bg-sidebar">
				<SideBar />
			</div>
		</div>
	</div>
</template>

<script>
import FindCity from './findCity';
import Citylist from './Citylist';
import SideBar from './sideBar';
import Daily from './Daily';

export default {
	name: 'Dashboard',
	components: {
		FindCity,
		Citylist,
		Daily,
		SideBar
	},
	computed: {
		currentWeather() {
			return this.$store.getters.getCurrentWeather;
		},
		isLoading() {
			return this.$store.getters.ifisLoading;
		}
	}
};
</script>
