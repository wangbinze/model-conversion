
function exportGLTF( url ) {
	var gltfExporter = new THREE.GLTFExporter();
	// var options = {
	// 	trs: document.getElementById( 'option_trs' ).checked,
	// 	onlyVisible: document.getElementById( 'option_visible' ).checked,
	// 	truncateDrawRange: document.getElementById( 'option_drawrange' ).checked,
	// 	binary: document.getElementById( 'option_binary' ).checked,
	// 	forceIndices: document.getElementById( 'option_forceindices' ).checked,
	// 	forcePowerOfTwoTextures: document.getElementById( 'option_forcepot' ).checked
	// };
	gltfExporter.parse( url, function ( result ) {
		// if ( result instanceof ArrayBuffer ) {
			// saveArrayBuffer( result, 'scene.glb' );
		// } else {
			var output = JSON.stringify( result, null, 2 );
			console.log( output );
		downloadJSON(output);
			// saveString( output, 'scene.gltf' );
		// }
	} );
}

function aaa(url){

	document.getElementById( 'export_obj2gltf' ).addEventListener( 'click', function () {
		exportGLTF( url );
	} );
}



/*function export_obj2gltf(url) {
	var gltfExporter  = new THREE.GLTFExporter();
	// object.visible = false;

	console.log(url);
	gltfExporter.parse(url , function (result) {
		var output = JSON.stringify( result, null, 2 );
		console.log( output );
		saveString( output, 'scene.gltf' );
	});

}*/
