<template>
	<i role="presentation" :aria-label="titlename" :title="titlename" :class="classname" />
</template>

<script>
export default {
	name: 'Checked',
	props: {
		name: String,
		className: String
	},
	data() {
		return {
			classname: this.className,
			titlename: `checked:${this.name}`
		};
	}
};
</script>