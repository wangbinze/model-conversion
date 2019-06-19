<template>
	<div>
		<router-view/>
		<ul>
			<li><router-view :to="{name: 'list'}">新闻列表</router-view></li>
			<li><router-view :to="{name: 'user'}">个人中心</router-view></li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "Home"
	}
</script>

<style scoped>

</style>