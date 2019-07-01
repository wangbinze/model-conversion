<template>
	<div class="conversion">
		<h3>{{ msg1 }}</h3>
		<div class="demo1">
			<!--<input class="upload" type="file" onchange=onUpload2(this.files[0])>-->
			<!--<div id="file-upload-form">
				<input id="file-upload-input" type="file" name="files[]" multiple="" class="hide">
				<input type="submit" value="在此处上传或删除文件" id="file-upload-button">
			</div>-->
			模型展示显示位置
		</div>
	</div>
</template>

<script>
	export default {
		name: "ConversionDetails",
		props: {
			msg1: String
		}
	}
</script>

<style scoped>
	.demo1 {
		width: 70%;
		height: 650px;
		background-color: aquamarine;
		border: 1px solid aquamarine;
		text-align: center;
		margin: auto;
	}
</style>