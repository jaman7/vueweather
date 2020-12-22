<template>
	<span :class="className">{{ item }}</span>
</template>

<script>
export default {
	props: {
		item: [String, Number],
		className: String
	},
	name: 'Span'
};
</script>
