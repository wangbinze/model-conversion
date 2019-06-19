<template>
	<div>
		hello info component
		<button type="button" @click="add()">添加</button>
	</div>
</template>

<script>
	export default {
		name: "Info",
		methods: {
			add() {
				console.log('add Event form info!!!');
			}
		}
	}
</script>

<style scoped>

</style>