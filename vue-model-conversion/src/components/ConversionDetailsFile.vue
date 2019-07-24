<template>
	<div>
		<!--上传按钮-->


		<form>
		<div>
			<label for="image_uploads">选择你要查看的模型文件(GLTF)</label>
			<input type="file" id="image_uploads" name="image_uploads" @change="getFile(file)" accept="" multiple style="display: none">
		</div>

			<!--<br>-->
			<!--<br>-->

			<!--<div>-->
				<!--<button @click="modelFile">Submit</button>-->
			<!--</div>-->
		</form>


		<br>
		<br>
		<!--模型放置位置-->
		<div id="container"></div>

	</div>
</template>

<script>



	// 引入three.js
	import * as THREE from 'three'
	import {OrbitControls} from  'three/examples/jsm/controls/OrbitControls'
	// import {MTLLoader} from  'three/examples/jsm/loaders/MTLLoader'
	// import {OBJLoader} from  'three/examples/jsm/loaders/OBJLoader'
	import {GLTFLoader} from  'three/examples/jsm/loaders/GLTFLoader'
	import {DRACOLoader} from  'three/examples/jsm/loaders/DRACOLoader'



	export default {
		name: 'ThreeTest',
		comments:{
		},
		data () {
			return {
				camera: null,
				scene: null,
				renderer: null,
				mesh: null,
				file: null
			}
		},
		methods: {

			getFile(file){
					let blob = new Blob([file]), // 文件转化成二进制文件
					url = URL.createObjectURL(blob); //转化成url
					// var url = url0.replace(/http:\/\/localhost:8082/, "null")
					console.log(url);
					this.modelCanvas(url)
			},
			// modelFile(file) {
			// 	//获取url
			// 	var blob = new Blob([file]), // 文件转化成二进制文件
			// 	url = URL.createObjectURL(blob); //转化成url
			// 	console.log(url);
			// 	//展示模型相关代码
			// 	this.modelCanvas(url)
			// },


			//模型展示js
			modelCanvas(url){
				//3D动画的js代码和函数
				// var blob = new Blob([file]), // 文件转化成二进制文件
				// url = URL.createObjectURL(blob); //转化成url
				// console.log(url);
				
				var container = document.getElementById('container');

				var renderer;

				function initRender() {
					renderer = new THREE.WebGLRenderer({antialias: true});
					renderer.setSize(window.innerWidth, window.innerHeight);
					//告诉渲染器需要阴影效果
					renderer.setClearColor(0xffffff);
					container.appendChild(renderer.domElement);
				}

				var camera;

				function initCamera() {
					camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
					camera.position.set(0, 40, 50);
					camera.lookAt(new THREE.Vector3(0, 0, 0));
				}

				var scene;

				function initScene() {
					scene = new THREE.Scene();
				}


				var light;

				function initLight() {
					scene.add(new THREE.AmbientLight(0xffffff));
					light = new THREE.PointLight(0xffffff);
					light.position.set(0, 0, 100);
					//告诉平行光需要开启阴影投射
					light.castShadow = true;
					scene.add(light);
				}

				function initModel() {

					//辅助工具、视图中间的xyz轴
					/*var helper = new THREE.AxesHelper(0);
					scene.add(helper);*/
					//加载gltf格式的模型
					var loader = new GLTFLoader();
					loader.setDRACOLoader(new DRACOLoader());
					// Load a glTF resource
					let self = this;
					loader.load(
						// resource URL
						//  在此处设置  对路径进行选择
						// '../Output/model3.gltf',
						url,
						// console.log(url),
						// called when the resource is loaded
						function (gltf) {
							//设置模型大小
							// gltf.scene.scale.set(0.08,0.08,0.08);
							self.scene.add(gltf.scene);
							// gltf.animations; // Array<THREE.AnimationClip>
							// gltf.scene; // THREE.Scene
							// gltf.scenes; // Array<THREE.Scene>
							// gltf.cameras; // Array<THREE.Camera>
							// gltf.asset; // Object
						},
						// called while loading is progressing
						function (xhr) {
							console.log((xhr.loaded / xhr.total * 100) + '% loaded');
						},
						// called when loading has errors
						function (error) {
							console.log('An error happened');
							console.log(error);
						},
					)
				}

				//初始化性能插件、（左上角的fps控件）
				// var stats;
				// function initStats() {
				//   stats = new Stats();
				//   document.body.appendChild(stats.dom);
				// }
				//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
				var controls;

				function initControls() {
					controls = new OrbitControls(camera, renderer.domElement);
					//鼠标点击后的旋转速度
					// controls.rotateSpeed = 5;

					// 如果使用animate方法时，将此函数删除
					//controls.addEventListener( 'change', render );

					// 使动画循环使用时阻尼或自转 意思是否有惯性
					controls.enableDamping = true;

					//动态阻尼系数 就是鼠标拖拽旋转灵敏度
					controls.dampingFactor = 0.55;

					//是否可以缩放
					controls.enableZoom = true;

					//是否自动旋转
					controls.autoRotate = false;

					//设置相机距离原点的最远距离
					controls.minDistance = 1;

					//设置相机距离原点的最远距离
					controls.maxDistance = 200;
					//是否开启右键拖拽
					controls.enablePan = true;
				}

				function render() {
					renderer.render(scene, camera);
				}

				//窗口变动触发的函数
				function onWindowResize() {
					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();
					render();
					renderer.setSize(window.innerWidth, window.innerHeight);
				}

				function animate() {
					//更新控制器
					render();
					//更新性能插件
					// stats.update();
					controls.update();
					requestAnimationFrame(animate);
				}


				// initGui();
				initRender();
				initScene();
				initCamera();
				initLight();
				initModel();
				initControls();
				// initStats();
				animate();
				window.onresize = onWindowResize;
			},

		},
		mounted() {

		}

	}
</script>
<style scoped>
/*	#container {
		width: 90%;
		height: 500px;
		!*!*background-color: aquamarine;*!*!
		border: 1px solid #ff0d21;
		text-align: center;
		margin: auto;
		!*background-color: #9ac2be;*!
	}*/
	/*form {*/
		/*width: 600px;*/
		/*background: #ccc;*/
		/*margin: 0 auto;*/
		/*padding: 20px;*/
		/*border: 1px solid black;*/
	/*}*/
	form ol {
		padding-left: 0;
	}
	form li, div > p {
		background: #eee;
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
		list-style-type: none;
		border: 1px solid black;
	}
	form img {
		height: 64px;
		order: 1;
	}
	form p {
		line-height: 32px;
		padding-left: 10px;
	}
	form label, form button {
		background-color: #7F9CCB;
		padding: 5px 10px;
		border-radius: 5px;
		border: 1px ridge black;
		font-size: 1.2rem;
		height: auto;
	}
	form label:hover, form button:hover {
		background-color: #2D5BA3;
		color: white;
	}
	form label:active, form button:active {
		background-color: #0D3F8F;
		color: white;
	}

</style>
