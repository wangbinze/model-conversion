<template>
	<div>
		<!--上传按钮-->
		<!--<input type="file" value=""  id="file"  @change='onUpload'>-->
		<el-upload
			class="upload-demo"
			drag
			action="https://jsonplaceholder.typicode.com/posts/"
			multiple
			:on-change="handleChange"
			:file-list="fileList">
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">只能上传OBJ/OSGB/DAE文件</div>
		</el-upload>

		<br>
		<!--模型放置位置-->
		<div id="container"></div>

	</div>
</template>

<script>
	// 引入three.js
	import * as Three from 'three'
	// import WebGl from 'WebGL'
	import OrbitControls from  'three-orbitcontrols'
	import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader'
	import GLTFLoader from 'three-gltf-loader';

	export default {
		name: 'ThreeTest',
		data () {
			return {
				fileList:[{

				}]
			}
		},
		methods: {
			handleChange(file, fileList) {
				this.fileList = fileList.slice(-1);
			}
		},
	}
</script>
<style scoped>
	#container {
		height: 600px;
		width: 100%;
		background-color: aquamarine;
	}
</style>
