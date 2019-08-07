<template>
	<div id="pageQuiButton">
		<!--使用-->
		<qui-btn msg="我可以点击" class="small" @btnClickEvent="doSth"></qui-btn>
	</div>
</template>

<script>
	import quiBtn from '../components/qiuButton'; //引用

	export default {
		name: "pageQuiButton",
		components: {
			'qui-btn': quiBtn //注册自定义标签
		},
		methods: {
			doSth: function () {
				alert('你点击了组件的clik:btnClickEvent');
			}
		}
	}
</script>

<style scoped>

</style>
