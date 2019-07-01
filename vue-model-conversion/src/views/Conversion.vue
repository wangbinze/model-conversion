<template>
	<div class="conversion">
		<h1>转换页面</h1>
		<conversion-details msg1="'所有转换都发生在您的PC上，任何模型或文本都不会上传到我的服务器或以任何方式存储。"/>
	</div>
</template>

<script>

	import ConversionDetails from '@/components/ConversionDetails.vue'

	export default {
		name: "conversion",
		components: {
			ConversionDetails
		}
	}
</script>

<style scoped>

</style>