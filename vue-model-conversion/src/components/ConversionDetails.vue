<template>
	<div class="conversion">
		<h3>{{ msg1 }}</h3>
		<!--<canvas class="demo1">
			&lt;!&ndash;<input class="upload" type="file" onchange=onUpload2(this.files[0])>&ndash;&gt;
			&lt;!&ndash;<div id="file-upload-form">
				<input id="file-upload-input" type="file" name="files[]" multiple="" class="hide">
				<input type="submit" value="在此处上传或删除文件" id="file-upload-button">
			</div>&ndash;&gt;
			模型展示显示位置
		</canvas>-->

		<!--<div class="section">
			<a href="javascript:;">
				<input class="upload" type="file" onchange=onUpload2(this.files[0])>
				<div class="preview preview2"></div>
			</a>
		</div>-->


		<!--上传按钮-->
		<div class="section">
			<input class="upload" type="file" onchange=onUpload2(this.files[0])>
			<div class="preview preview2"></div>
		</div>

		<br>

		<!--模型展示位置-->
		<canvas id="demo1">
				Please use the browser supporting "canvas".
		</canvas>

		<div ref="demo1"></div>

	</div>
</template>

<script>
	import * as THREE from "three";

	export default {
		name: "ConversionDetails",
		props: {
			msg1: String
		},


	}


</script>

<style scoped>
	#demo1 {
		width: 60%;
		height: 450px;
		/*background-color: aquamarine;*/
		border: 1px solid aquamarine;
		text-align: center;
		margin: auto;
	}

</style>