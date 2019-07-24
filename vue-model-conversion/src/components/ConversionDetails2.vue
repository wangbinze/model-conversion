<template>
	<div>
		<!--上传按钮-->
		<!--<input type="file" value=""  id="file"  @change='onUpload'>-->
		<el-upload
			class="upload-demo"
			drag
			action="https://jsonplaceholder.typicode.com/posts/"
			multiple
			list-type=""
			:on-change="handleChange"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
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
				camera: null,
				scene: null,
				renderer: null,
				mesh: null,
				fileList:[{

				}]
			}
		},
		methods: {
			handleChange:function(file, fileList) {
				this.fileList = fileList.slice(-1);
			},
			// submitUpload() {
			// 	this.$refs.upload.submit();
			// },
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			//此处需要点击才能生效  --需要改进
			handlePreview(file) {
				console.log(file);
			},
			init: function () {
				let container = document.getElementById('container');
				this.camera = new Three.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
				this.camera.position.z = 0.6;
				this.scene = new Three.Scene();
				//长宽高
				let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
				let material = new Three.MeshNormalMaterial();
				this.mesh = new Three.Mesh(geometry, material);
				this.scene.add(this.mesh);

				this.renderer = new Three.WebGLRenderer({antialias: true});
				this.renderer.setSize(container.clientWidth, container.clientHeight);
				container.appendChild(this.renderer.domElement);
			},
			//运动
			animate: function () {
				requestAnimationFrame(this.animate);
				this.mesh.rotation.x += 0.01;
				this.mesh.rotation.y += 0.01;
				this.renderer.render(this.scene, this.camera);
			}
		},
		mounted() {
			this.init();
			this.animate();
			this.handleChange()
		}
	}
</script>
<style scoped>
	/*#container {*/
		/*height: 600px;*/
		/*width: 100%;*/
		/*background-color: aquamarine;*/
	/*}*/
</style>
