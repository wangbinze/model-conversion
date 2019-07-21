<template>
	<div class="conversion">
		<h1>转换页面</h1>
		<P>您可以通过本页面对你的3D模型进行在线转换，<b>不需要</b>任何第三方软件</P>
		<conversion-details msg1="所有转换都发生在您的PC上，任何模型或文本都不会上传到我们的服务器或以任何方式存储。"/>
	</div>
</template>

<script>

	import ConversionDetails from '@/components/ConversionDetails1.vue'

	export default {
		name: "conversion",
		components: {
			ConversionDetails
		}
	}
</script>

<style scoped>

</style>