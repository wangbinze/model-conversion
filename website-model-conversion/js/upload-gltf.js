
function onUpload(file) {
	// 文件转化成二进制文件
	var blob = new Blob([file]),
	//转化成url
	url = URL.createObjectURL(blob);
	console.log(url);

	//转换obj2gltf的
	/*const obj2gltf = require('obj2gltf');
	const fs = require('fs');
	obj2gltf(url)
		.then(function(gltf) {
			const data = Buffer.from(JSON.stringify(gltf));
			fs.writeFileSync(url1, data);
		});*/

	//3D动画的js代码和函数

	// 获取container
	var container = document.getElementById('container');

	//渲染器
	var renderer;
	function initRender() {
		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setSize(window.innerWidth, window.innerHeight);
		//告诉渲染器需要阴影效果
		renderer.setClearColor(0xffffff);
		container.appendChild(renderer.domElement);
	}

	//相机
	var camera;
	function initCamera() {
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(0, 40, 50);
		camera.lookAt(new THREE.Vector3(0, 0, 0));
	}

	//场景
	var scene;
	function initScene() {
		scene = new THREE.Scene();
	}

	//灯光
	var light;
	function initLight() {
		scene.add(new THREE.AmbientLight(0xffffff));
		light = new THREE.PointLight(0xffffff);
		light.position.set(0, 0, 100);
		//告诉平行光需要开启阴影投射
		light.castShadow = true;
		scene.add(light);
	}

	//模型
	function initModel() {
		//辅助工具、视图中间的xyz轴
		/*var helper = new THREE.AxesHelper(0);
		scene.add(helper);*/

		//加载gltf格式的模型
		var loader = new THREE.GLTFLoader();
		loader.setDRACOLoader(new THREE.DRACOLoader());
		// Load a glTF resource
		loader.load(
			// resource URL
			//  在此处设置  对路径进行选择
			// '../Output/model3.gltf',
			url,

			// called when the resource is loaded
			function (gltf) {
				//设置模型大小
				// gltf.scene.scale.set(0.08,0.08,0.08);
				scene.add(gltf.scene);
				// gltf.animations; // Array<THREE.AnimationClip>
				// gltf.scene; // THREE.Scene
				// gltf.scenes; // Array<THREE.Scene>
				// gltf.cameras; // Array<THREE.Camera>
				// gltf.asset; // Object
			},
			// called while loading is progressing
			function (xhr) {
				console.log((xhr.loaded / xhr.total * 1) + '% loaded');
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
		controls = new THREE.OrbitControls(camera, renderer.domElement);
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
}
