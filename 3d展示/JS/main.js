var scene, camera, pointLight, stats;
var renderer, mixer, controls;

var clock = new THREE.Clock();
var container = document.getElementById( 'container' );

stats = new Stats();
// container.appendChild( stats.dom );  //去除左上角fps

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth  , window.innerHeight,false);   //改变canvas大小和位置
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;
container.appendChild( renderer.domElement );

scene = new THREE.Scene();
scene.background = new THREE.Color( 0xbfe3dd );

camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
camera.position.set( 5, 2, 8 );

controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.target.set( 0, 0.5, 0 );
controls.enablePan = false;

scene.add( new THREE.AmbientLight( 0x404040 ) );

pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.copy( camera.position );
scene.add( pointLight );

// envmap
var path = 'textures/cube/Park2/';
var format = '.jpg';
var envMap = new THREE.CubeTextureLoader().load( [
  path + 'posx' + format, path + 'negx' + format,
  path + 'posy' + format, path + 'negy' + format,
  path + 'posz' + format, path + 'negz' + format
] );

THREE.DRACOLoader.setDecoderPath( 'js/libs/draco/gltf/' );

var loader = new THREE.GLTFLoader();
loader.setDRACOLoader( new THREE.DRACOLoader() );
loader.load( '../littlest_tokyo/scene.gltf', function ( gltf ) {

  var model = gltf.scene;
  model.position.set( 1, 1, 0 );
  model.scale.set( 0.01, 0.01, 0.01 );
  model.traverse( function ( child ) {

    if ( child.isMesh ) child.material.envMap = envMap;

  } );

  scene.add( model );

  mixer = new THREE.AnimationMixer( model );
  mixer.clipAction( gltf.animations[ 0 ] ).play();

  animate();

}, undefined, function ( e ) {

  console.error( e );

} );


window.onresize = function () {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight  );

};


function animate() {

  requestAnimationFrame( animate );

  var delta = clock.getDelta();
  mixer.update( delta );
  controls.update( delta );

  stats.update();

  renderer.render( scene, camera );
}



