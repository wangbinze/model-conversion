<template>
	<div>
		<!--上传按钮-->

		<el-upload
			class="upload-demo"
			drag
			accept=".gltf"
			action=""
			multiple
			:on-change="handleChange"
			:on-remove="handleRemove"
			:on-success="handleSuccess"
			:file-list="fileList"
		>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>
				<br>只能上传OBJ/OSGB/DAE文件
			</div>
			<!--<div class="el-upload__tip" slot="tip"><h1>只能上传OBJ/OSGB/DAE文件</h1></div>-->
		</el-upload>

		<input type="file" @click="upload()">

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
		data () {
			return {
				camera: null,
				scene: null,
				renderer: null,
				mesh: null,
				fileList:[{
					name: '上传后将在此处显示',
				}],
			}
		},
		methods: {

			handleChange(file, fileList) {
				this.fileList = fileList.slice(-1);
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			//上传完成后的回调函数
			handleSuccess(file){
				alert('上传完成');
				//获取url
				var blob = new Blob([file]), // 文件转化成二进制文件
					url = URL.createObjectURL(blob); //转化成url
				console.log(url);
				//展示模型相关代码
				this.modelCanvas(url)

			},

			//模型展示js
			modelCanvas(url){
				//3D动画的js代码和函数

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


			//此处需要点击才能生效 点击文件名可查看文件相关信息  控制台
			// handlePreview(file) {
			// 	console.log(file);
			// 	var blob = new Blob([file]), // 文件转化成二进制文件
			// 	url = URL.createObjectURL(blob); //转化成url
			// 	console.log(url);
			// },


			//原有简单动画
			/*init: function () {
				let container = document.getElementById('container');
				this.camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.01, 10);
				this.camera.position.z = 0.6;
				this.scene = new THREE.Scene();
				//长宽高
				let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
				let material = new THREE.MeshNormalMaterial();
				this.mesh = new THREE.Mesh(geometry, material);
				this.scene.add(this.mesh);

				this.renderer = new THREE.WebGLRenderer({antialias: true});
				this.renderer.setSize(container.clientWidth, container.clientHeight);
				container.appendChild(this.renderer.domElement);
			},
			//运动
			animate: function () {
				requestAnimationFrame(this.animate);
				this.mesh.rotation.x += 0.01;
				this.mesh.rotation.y += 0.01;
				this.renderer.render(this.scene, this.camera);
			}*/
		},
		mounted() {
			/*this.init();
			this.animate();*/
		}

	}
</script>
<style scoped>
	#container {
		/*width: 90%;*/
		height: 500px;
		/*!*background-color: aquamarine;*!*/
		/*border: 1px solid #ff0d21;*/
		text-align: center;
		margin: auto;
		/*background-color: #9ac2be;*/
	}
</style>
