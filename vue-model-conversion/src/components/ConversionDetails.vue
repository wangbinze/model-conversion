<template>
	<div class="conversion">
		<h3>{{ msg1 }}</h3>

		<!--上传按钮---待修改-->
		<div class="section">
			<input class="upload" type="file" onchange=onUpload2(this.files[0])>
			<div class="preview preview2"></div>
		</div>
		<br>

		<!--模型展示位置-->
		<canvas id="demo1">
				Please use the browser supporting "canvas".
		</canvas>


	</div>
</template>

<script>
	// 引入three.js
	import * as Three from 'three'

	export default {
		name: "ConversionDetails",
		props: {
			msg1: String
		},
		methods:{

		}

	}



</script>

<style scoped>
	#demo1 {
		width: 90%;
		height: 500px;
		/*background-color: aquamarine;*/
		border: 1px solid #ff0d21;
		text-align: center;
		margin: auto;
		background-color: #9ac2be;
	}

</style>
