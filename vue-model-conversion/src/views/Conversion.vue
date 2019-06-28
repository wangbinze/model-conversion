<template>
	<div>
		<h1>转换页面</h1>
		<h3>所有转换都发生在您的PC上，任何模型或文本都不会上传到我的服务器或以任何方式存储。</h3>
		<div class="demo1">
			<!--<input class="upload" type="file" onchange=onUpload2(this.files[0])>-->
			<!--<div id="file-upload-form">
				<input id="file-upload-input" type="file" name="files[]" multiple="" class="hide">
				<input type="submit" value="在此处上传或删除文件" id="file-upload-button">
			</div>-->
		</div>
	</div>
</template>

<script>
	export default {
		name: "Conversion",
		methods: {

		}
	}
</script>

<style scoped>
	.demo1 {
		width: 70%;
		height: 650px;
		/*background-color: aquamarine;*/
		border: 1px solid aquamarine;
		text-align: center;
		margin: auto;
	}
</style>