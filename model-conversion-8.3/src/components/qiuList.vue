<template>
	<div class="qui-list">
		<span class="list-tips">{{tipsText}}</span>
		<component
			:is="currentView"
			v-on:btnClickEvent="btnClickEvent"
			:msg=msg class="small"
			keep-alive
		></component >
	</div>
</template>

<script>
	import quiButton from "./qiuButton.vue";
	import quiArrow from './qiuArrow.vue';

	export default {
		name: "",
		props: {
			msg: {
				default: '下载'
			},
			tipsText: {
				default: '默认的文案',
			}
		},
		components: {
			'qui-btn': quiButton,
			'qui-arrow': quiArrow
		},
		methods: {
			btnClickEvent: function () {
				alert('按钮点击事件')
			}
		}
	}
</script>

<style scoped>

</style>
