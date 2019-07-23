<template>
	<div>
		<!--上传按钮-->
		<!--<input type="file" value=""  id="file"  @change='onUpload'>-->
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
				mesh: null
			}
		},
		methods: {

		},
		mounted(){

		}
	}
</script>
<style scoped>
	#container {
		height: 600px;
	}
</style>
