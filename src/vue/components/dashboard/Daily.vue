<template>
	<div class="row">
		<div class="col-12">
			<h2>Daily Weather</h2>
			<div class="d-flex flex-column mt-5">
				<div
					v-for="(item , itemIndex ) in currentDailyWeather.slice(1,currentDailyWeather.length)"
					:key="itemIndex"
					class="daily-list"
					@click="setActiveItemId(itemIndex)"
				>
					<DailyItems :item="item" :key="`items-${itemIndex}`" />

					<div class="item-active collapse show">
						<CollapseTransition>
							<DailyCollapse
								v-show="activeItemId === itemIndex  && isActive"
								:item="item"
								:key="`collapse-${itemIndex}`"
							/>
						</CollapseTransition>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { CollapseTransition } from '@ivanv/vue-collapse-transition';

import DailyItems from './DailyItems';
import DailyCollapse from './DailyCollapse';

export default {
	name: 'Daily',
	components: {
		CollapseTransition,
		DailyItems,
		DailyCollapse
	},
	data() {
		return {
			activeItemId: ''
		};
	},
	methods: {
		setActiveItemId(itemIndex) {
			if (itemIndex === this.activeItemId) {
				this.activeItemId = '';
				return;
			}
			this.activeItemId = itemIndex;
		}
	},
	computed: {
		isActive() {
			return this.activeItemId !== '';
		},
		user() {
			return this.$store.getters.user;
		},
		currentDailyWeather() {
			return this.$store.getters.getDailyWeather;
		}
	}
};
</script>