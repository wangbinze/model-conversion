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
	// import * as THREE from "three";
	// import onUpload2 from '../js/index';

	export default {
		name: "ConversionDetails",
		props: {
			msg1: String
		},
		/*data: () => ({
			controls: {
				scene: null,
				camera: null,
				renderer: null,
				rotationSpeed: 0.02
			}
		}),
		created () {
			this.$nextTick(() => {
				this.init()
			})
		},
		methods: {
			init () {
				let {initMesh, controls} = this
				const gui = new dat.GUI() // gui监测器
				gui.add(controls, 'rotationSpeed', 0, 0.5)
				initMesh()
			},
			initMesh () {
				this.scene = new THREE.Scene() // 场景
				this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000) // 相机.视场，长宽比，近面，远面
				this.camera.position.x = -20
				this.camera.position.y = 40
				this.camera.position.z = 30
				this.camera.lookAt(this.scene.position)

				this.renderer = new THREE.WebGLRenderer({ antialias: true })// 渲染器
				this.renderer.setSize(window.innerWidth, window.innerHeight - 100)
				this.renderer.shadowMapEnabled = true // 开启阴影

				let axes = new THREE.AxisHelper(20) // 坐标轴

				let planeGeometry = new THREE.PlaneGeometry(60, 20, 10, 10) // 生成平面
				let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}) // 材质
				let plane = new THREE.Mesh(planeGeometry, planeMaterial)
				plane.rotation.x = -0.5 * Math.PI
				plane.position.x = 0
				plane.position.y = 0
				plane.position.z = 0
				plane.receiveShadow = true

				let cubeGeometry = new THREE.CubeGeometry(10, 10, 10)
				let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000})
				this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
				this.cube.position.x = -4
				this.cube.position.y = 3
				this.cube.position.z = 0
				this.cube.castShadow = true

				let spotLight = new THREE.SpotLight(0xffffff)
				spotLight.position.set(-40, 60, -10)
				spotLight.castShadow = true

				this.scene.add(axes) // 场景添加坐标轴
				this.scene.add(plane) // 向该场景中添加物体
				this.scene.add(this.cube)
				this.scene.add(spotLight)

				this.$refs.demo1.append(this.renderer.domElement)
				this.renderScene()
			},
			renderScene () {
				let {controls, cube, scene, camera, renderer} = this
				cube.rotation.x += controls.rotationSpeed
				cube.rotation.y += controls.rotationSpeed
				cube.rotation.z += controls.rotationSpeed
				requestAnimationFrame(this.renderScene)
				renderer.render(scene, camera)
			}
		}*/

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