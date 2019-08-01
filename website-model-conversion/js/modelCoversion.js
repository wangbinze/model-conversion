<!--导出-->
function exportGLTF( input ) {

	var gltfExporter = new THREE.GLTFExporter();


	//选择导出glb还是gltf
	var options = {
		binary: document.getElementById( 'option_binary' ).checked,
	};
	gltfExporter.parse( input, function ( result ) {
		if ( result instanceof ArrayBuffer ) {
			saveArrayBuffer( result, 'scene.glb' );
		} else {
			var output = JSON.stringify( result, null, 2 );
			console.log( output );
			saveString( output, 'scene.gltf' );
		}
	} ,options);
}

document.getElementById( 'export_scene' ).addEventListener( 'click', function () {
	exportGLTF( scene1 );
} );


var link = document.createElement( 'a' );
link.style.display = 'none';
document.body.appendChild( link ); // Firefox workaround, see #6594

function save( blob, filename ) {
	link.href = URL.createObjectURL( blob );
	link.download = filename;
	link.click();
}

function saveString( text, filename ) {
	save( new Blob( [ text ], { type: 'text/plain' } ), filename );
}


function saveArrayBuffer( buffer, filename ) {
	save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
}

if ( WEBGL.isWebGLAvailable() === false ) {
	document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var container;

var camera, scene1,  renderer, controls, elf;
var inputModel;


// ---------------------------------------------------------------------
//文件上传按钮
// ---------------------------------------------------------------------
function onUpload(file) {

	//清除画布
	var canvas = document.getElementsByTagName('canvas');
	console.log(canvas);
	/*// 保存当前渲染上下文所进行的变换
	context.save();

// 重置渲染上下文并清空画布
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);

// 恢复先前渲染上下文所进行的变换
	context.restore();*/

	// 文件转化成二进制文件
	var blob = new Blob([file]),
		//转化成url
		url = URL.createObjectURL(blob);
	console.log(url);

	//对文件进行判断
	console.log(file);
	console.log(file.name)
	console.log(file.name.slice(-4));
	//判断上传的file文件是何种格式--gltf/obj/osgb/dae

	if (file.name.slice(-4) == 'gltf'){
		initGltf(url);
		console.log('成功显示gltf文件');
	} else if (file.name.slice(-4) == '.obj') {
		initObj(url);
		console.log('成功显示obj文件')
	} else if (file.name.slice(-4) == '.dae') {
		initDae(url);
		console.log('成功显示dae文件')
	} else {
		alert('请上传正确的文件')
	}
}


/*function initGltf(url) {


	container = document.createElement( 'div' );
	document.body.appendChild( container );



	scene1 = new THREE.Scene();

	// ---------------------------------------------------------------------
	// Perspective Camera
	// ---------------------------------------------------------------------
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 600, 400, 0 );

	camera.name = "PerspectiveCamera";
	scene1.add( camera );

	// ---------------------------------------------------------------------
	// Ambient light  环境光
	// ---------------------------------------------------------------------
	var light = new THREE.AmbientLight( 0xffffff, 1);
	light.name = 'AmbientLight';
	scene1.add( light );

	// ---------------------------------------------------------------------
	// DirectLight  直射光
	// ---------------------------------------------------------------------
	light = new THREE.DirectionalLight( 0xffffff, 0.1 );
	light.target.position.set( 0, 0, -1 );
	light.add( light.target );
	light.lookAt( -1, -1, 0 );
	light.name = 'DirectionalLight';
	scene1.add( light );


	// ---------------------------------------------------------------------
	//加载gltf格式的模型
	var gltfloader = new THREE.GLTFLoader();
	gltfloader.setDRACOLoader(new THREE.DRACOLoader());
	gltfloader.load(
		url,
		function (gltf) {
			scene1.add(gltf.scene);
			gltf.scene.scale.set(3, 3, 3);
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 1) + '% loaded');
		},
		function (error) {
			console.log(error);
		},
	);



	// ---------------------------------------------------------------------
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	//设置canvas 大小
	renderer.setSize( window.innerWidth/1.6, window.innerHeight/1.6 );

	//设置背景颜色
	renderer.setClearColor(0xffffff);
	container.appendChild( renderer.domElement );
	// window.addEventListener( 'resize', onWindowResize, false );

	// ---------------------------------------------------------------------
	//鼠标操作模型操作
	// ---------------------------------------------------------------------
	controls = new THREE.OrbitControls(camera, renderer.domElement);
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
}*/
/*function initObj(url) {
	container = document.createElement( 'div' );
	document.body.appendChild( container );


	scene1 = new THREE.Scene();
	scene1.name = 'Scene1';

	// ---------------------------------------------------------------------
	// Perspective Camera
	// ---------------------------------------------------------------------
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 600, 400, 0 );

	camera.name = "PerspectiveCamera";
	scene1.add( camera );

	// ---------------------------------------------------------------------
	// Ambient light  环境光
	// ---------------------------------------------------------------------
	var light = new THREE.AmbientLight( 0xffffff, 0.1 );
	light.name = 'AmbientLight';
	scene1.add( light );

	// ---------------------------------------------------------------------
	// DirectLight  直射光
	// ---------------------------------------------------------------------
	light = new THREE.DirectionalLight( 0xffffff, 0.1 );
	light.target.position.set( 0, 0, -1 );
	light.add( light.target );
	light.lookAt( -1, -1, 0 );
	light.name = 'DirectionalLight';
	scene1.add( light );

	// ---------------------------------------------------------------------
	// 导入obj文件
	// ---------------------------------------------------------------------
	var loader = new THREE.OBJLoader();
	loader.load( url, function ( obj ) {
		inputModel = obj;
		inputModel.scale.multiplyScalar( 1.5 );
		inputModel.specularMap = new THREE.TextureLoader().load("url1");

		scene1.add( inputModel );
	} );

	// ---------------------------------------------------------------------
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	//设置canvas 大小
	renderer.setSize( window.innerWidth/1.6, window.innerHeight/1.6 );
	//设置背景颜色
	renderer.setClearColor(0xffffff);
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	// ---------------------------------------------------------------------
	//鼠标操作模型操作
	// ---------------------------------------------------------------------
	controls = new THREE.OrbitControls(camera, renderer.domElement);
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
}*/
/*function initDae(url) {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene1 = new THREE.Scene();
	scene1.name = 'Scene1';

	// ---------------------------------------------------------------------
	// Perspective Camera
	// ---------------------------------------------------------------------
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.set( 600, 400, 0 );

	camera.name = "PerspectiveCamera";
	scene1.add( camera );

	// ---------------------------------------------------------------------
	// Ambient light  环境光
	// ---------------------------------------------------------------------
	var light = new THREE.AmbientLight( 0xffffff, 0.1 );
	light.name = 'AmbientLight';
	scene1.add( light );

	// ---------------------------------------------------------------------
	// DirectLight  直射光
	// ---------------------------------------------------------------------
	light = new THREE.DirectionalLight( 0xffffff, 0.1 );
	light.target.position.set( 0, 0, -1 );
	light.add( light.target );
	light.lookAt( -1, -1, 0 );
	light.name = 'DirectionalLight';
	scene1.add( light );


	// ---------------------------------------------------------------------
	//加载dae格式的模型
	var loadingManager = new THREE.LoadingManager( function () {
		scene1.add( elf );
	} );

	var daeLoader = new THREE.ColladaLoader(loadingManager);
	daeLoader.load(
		url,
		function (collada ) {
			elf = collada.scene;
			inputModel = collada;
			scene1.add( inputModel );

			//设置位置
			elf.position.set(0, 0, -20)
		},
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 1) + '% loaded');
		},
		function (error) {
			console.log(error);
		},
	);



	// ---------------------------------------------------------------------
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth/1.6, window.innerHeight/1.6 );
	//设置背景颜色
	renderer.setClearColor(0xffffff);
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	// ---------------------------------------------------------------------
	//鼠标操作模型操作
	// ---------------------------------------------------------------------
	controls = new THREE.OrbitControls(camera, renderer.domElement);
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
}*/

function initObj(url) {
	var renderer;
	function initRender() {
		renderer = new THREE.WebGLRenderer({antialias:true});
		//设置canvas 大小
		renderer.setSize( window.innerWidth/1.6, window.innerHeight/1.6 );
		//告诉渲染器需要阴影效果
		renderer.setClearColor(0xffffff);
		document.body.appendChild(renderer.domElement);
	}

	var camera;
	function initCamera() {
		camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
		camera.position.set(0, 40, 50);
		camera.lookAt(new THREE.Vector3(0,0,0));
	}


	// var scene;
	function initScene() {
		scene1 = new THREE.Scene();
		scene1.name = 'Scene1';
	}


	var light;
	function initLight() {
		scene1.add(new THREE.AmbientLight(0xffffff, 1 ));

		light = new THREE.PointLight(0xffffff);
		light.position.set(0,0,0);

		//告诉平行光需要开启阴影投射
		// light.castShadow = true;

		scene1.add(light);

		// ---------------------------------------------------------------------
		// Ambient light  环境光
		// ---------------------------------------------------------------------
		// light = new THREE.AmbientLight( 0xffffff, 0.1 );
		// light.name = 'AmbientLight';
		// scene.add( light );
		//
		// // ---------------------------------------------------------------------
		// // DirectLight  直射光
		// // ---------------------------------------------------------------------
		// light = new THREE.DirectionalLight( 0xffffff, 0.1 );
		// light.target.position.set( 0, 0, -1 );
		// light.add( light.target );
		// light.lookAt( -1, -1, 0 );
		// light.name = 'DirectionalLight';
		// scene.add( light );
	}

	function initModel(url) {


		//加载OBJ格式的模型
		var loader = new THREE.OBJLoader();
		loader.load(url,function (loadedMesh) {
			var material = new THREE.MeshLambertMaterial({color: 0x5C3A21});

			// 加载完obj文件是一个场景组，遍历它的子元素，赋值纹理并且更新面和点的发现了
			loadedMesh.children.forEach(function (child) {
				child.material = material;
				child.geometry.computeFaceNormals();
				child.geometry.computeVertexNormals();
			});

			//模型放大一百倍
			loadedMesh.scale.set(1, 1, 1);
			scene1.add(loadedMesh);
		});
	}

	//初始化性能插件
	/*var stats;
	function initStats() {
		stats = new Stats();
		document.body.appendChild(stats.dom);
	}*/

	//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
	var controls;
	function initControls() {

		controls = new THREE.OrbitControls( camera, renderer.domElement );

		// 如果使用animate方法时，将此函数删除
		//controls.addEventListener( 'change', render );
		// 使动画循环使用时阻尼或自转 意思是否有惯性
		controls.enableDamping = false;
		//动态阻尼系数 就是鼠标拖拽旋转灵敏度
		controls.dampingFactor = 0.05;
		//是否可以缩放
		controls.enableZoom = true;
		//是否自动旋转
		controls.autoRotate = false;
		//设置相机距离原点的最远距离
		controls.minDistance  = 1;
		//设置相机距离原点的最远距离
		controls.maxDistance  = 200;
		//是否开启右键拖拽
		controls.enablePan = true;
	}

	function render() {

		renderer.render( scene1, camera );
	}

	//窗口变动触发的函数
	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		render();
		//设置canvas 大小
		renderer.setSize( window.innerWidth/1.6, window.innerHeight/1.6 );
	}

	function animate() {
		//更新控制器
		render();

		//更新性能插件
		// stats.update();

		// controls.update();

		requestAnimationFrame(animate);
	}

	function draw(url) {
		// initGui();
		initRender();
		initScene();
		initCamera();
		initLight();
		initModel(url);
		initControls();
		// initStats();

		animate();
		window.onresize = onWindowResize;
	}

	draw(url)
}

function initGltf(url) {
	var renderer;
	function initRender() {
		renderer = new THREE.WebGLRenderer({antialias:true});
		//设置canvas 大小
		renderer.setSize( window.innerWidth/1.6, window.innerHeight/1.6 );
		//告诉渲染器需要阴影效果
		renderer.setClearColor(0xffffff);
		document.body.appendChild(renderer.domElement);
	}

	var camera;
	function initCamera() {
		camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
		camera.position.set(0, 40, 50);
		camera.lookAt(new THREE.Vector3(0,0,0));
	}


	// var scene;
	function initScene() {
		scene1 = new THREE.Scene();
		scene1.name = 'Scene1';
	}


	var light;
	function initLight() {
		scene1.add(new THREE.AmbientLight(0xffffff, 1 ));

		light = new THREE.PointLight(0xffffff);
		light.position.set(0,0,0);

		//告诉平行光需要开启阴影投射
		// light.castShadow = true;
		//
		scene1.add(light);

		// ---------------------------------------------------------------------
		// Ambient light  环境光
		// ---------------------------------------------------------------------
		// light = new THREE.AmbientLight( 0xffffff, 0.1 );
		// light.name = 'AmbientLight';
		// scene.add( light );
		//
		// // ---------------------------------------------------------------------
		// // DirectLight  直射光
		// // ---------------------------------------------------------------------
		// light = new THREE.DirectionalLight( 0xffffff, 0.1 );
		// light.target.position.set( 0, 0, -1 );
		// light.add( light.target );
		// light.lookAt( -1, -1, 0 );
		// light.name = 'DirectionalLight';
		// scene.add( light );
	}

	function initModel(url) {


		//加载gltf格式的模型
		var gltfloader = new THREE.GLTFLoader();
		gltfloader.setDRACOLoader(new THREE.DRACOLoader());
		gltfloader.load(
			url,
			function (gltf) {
				scene1.add(gltf.scene);
				// gltf.scene.scale.set(3, 3, 3);
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total * 1) + '% loaded');
			},
			function (error) {
				console.log(error);
			},
		);
	}

	//初始化性能插件
	/*var stats;
	function initStats() {
		stats = new Stats();
		document.body.appendChild(stats.dom);
	}*/

	//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
	var controls;
	function initControls() {

		controls = new THREE.OrbitControls( camera, renderer.domElement );

		// 如果使用animate方法时，将此函数删除
		//controls.addEventListener( 'change', render );
		// 使动画循环使用时阻尼或自转 意思是否有惯性
		controls.enableDamping = false;
		//动态阻尼系数 就是鼠标拖拽旋转灵敏度
		controls.dampingFactor = 0.05;
		//是否可以缩放
		controls.enableZoom = true;
		//是否自动旋转
		controls.autoRotate = false;
		//设置相机距离原点的最远距离
		controls.minDistance  = 1;
		//设置相机距离原点的最远距离
		controls.maxDistance  = 200;
		//是否开启右键拖拽
		controls.enablePan = true;
	}

	function render() {

		renderer.render( scene1, camera );
	}

	//窗口变动触发的函数
	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		render();
		//设置canvas 大小
		renderer.setSize( window.innerWidth/1.6, window.innerHeight/1.6 );

	}

	function animate() {
		//更新控制器
		render();

		//更新性能插件
		// stats.update();

		// controls.update();

		requestAnimationFrame(animate);
	}

	function draw(url) {
		// initGui();
		initRender();
		initScene();
		initCamera();
		initLight();
		initModel(url);
		initControls();
		// initStats();

		animate();
		window.onresize = onWindowResize;
	}

	draw(url)
}

function initDae(url) {

	function initModel(url) {

		var loadingManager = new THREE.LoadingManager( function () {
			scene1.add( elf );
		} );

		var daeLoader = new THREE.ColladaLoader(loadingManager);
		daeLoader.load(
			url,
			function (collada ) {
				elf = collada.scene;
				inputModel = collada;
				scene1.add( inputModel );

				//设置位置
				elf.position.set(0, 0, -20)
			},
			function (xhr) {
				console.log((xhr.loaded / xhr.total * 1) + '% loaded');
			},
			function (error) {
				console.log(error);
			},
		);
	}

	// RenderScene();
	var renderer;
	function initRender() {
		renderer = new THREE.WebGLRenderer({antialias:true});
		//设置canvas 大小
		renderer.setSize( window.innerWidth/1.6, window.innerHeight/1.6 );
		//告诉渲染器需要阴影效果
		renderer.setClearColor(0xffffff);
		document.body.appendChild(renderer.domElement);
	}

	var camera;
	function initCamera() {
		camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
		camera.position.set(0, 40, 50);
		camera.lookAt(new THREE.Vector3(0,0,0));
	}


	// var scene;
	function initScene() {
		scene1 = new THREE.Scene();
		scene1.name = 'Scene1';
	}


	var light;
	function initLight() {
		scene1.add(new THREE.AmbientLight(0xffffff, 1 ));

		light = new THREE.PointLight(0xffffff);
		light.position.set(0,0,0);

		//告诉平行光需要开启阴影投射
		// light.castShadow = true;

		scene1.add(light);

		/*// ---------------------------------------------------------------------
		// Ambient light  环境光
		// ---------------------------------------------------------------------
		light = new THREE.AmbientLight( 0xffffff, 0.1 );
		light.name = 'AmbientLight';
		scene1.add( light );

		// ---------------------------------------------------------------------
		// DirectLight  直射光
		// ---------------------------------------------------------------------
		light = new THREE.DirectionalLight( 0xffffff, 0.1 );
		light.target.position.set( 0, 0, -1 );
		light.add( light.target );
		light.lookAt( -1, -1, 0 );
		light.name = 'DirectionalLight';
		scene1.add( light );*/
	}



	//初始化性能插件
	/*var stats;
	function initStats() {
		stats = new Stats();
		document.body.appendChild(stats.dom);
	}*/

	//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
	var controls;
	function initControls() {

		controls = new THREE.OrbitControls( camera, renderer.domElement );

		// 如果使用animate方法时，将此函数删除
		//controls.addEventListener( 'change', render );
		// 使动画循环使用时阻尼或自转 意思是否有惯性
		controls.enableDamping = false;
		//动态阻尼系数 就是鼠标拖拽旋转灵敏度
		controls.dampingFactor = 0.05;
		//是否可以缩放
		controls.enableZoom = true;
		//是否自动旋转
		controls.autoRotate = false;
		//设置相机距离原点的最远距离
		controls.minDistance  = 1;
		//设置相机距离原点的最远距离
		controls.maxDistance  = 200;
		//是否开启右键拖拽
		controls.enablePan = true;
	}

	function render() {

		renderer.render( scene1, camera );
	}

	//窗口变动触发的函数
	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		render();
//设置canvas 大小
		renderer.setSize( window.innerWidth/1.6, window.innerHeight/1.6 );
	}

	function animate() {
		//更新控制器
		render();

		//更新性能插件
		// stats.update();

		// controls.update();

		requestAnimationFrame(animate);
	}

	function draw(url) {
		// initGui();
		initRender();
		initScene();
		initCamera();
		initLight();
		initModel(url);
		initControls();
		// initStats();

		animate();
		window.onresize = onWindowResize;
	}

	draw(url)
}
