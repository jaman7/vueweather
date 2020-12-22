<template>
	<div class="container-fluid main-wrapper">
		<div class="row flex-xl-nowrap">
			<div class="col-12 col-md-9 col-xl-8 order-2 order-md-1 bg-content">
				<FindCity />
				<Citylist />
				<Daily />
				<Chart />
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
import Daily from './Daily';

import SideBar from './sideBar';
import Chart from './Chart';

export default {
	name: 'Dashboard',
	components: {
		FindCity,
		Citylist,
		Daily,
		Chart,
		SideBar
	}
};
</script>
