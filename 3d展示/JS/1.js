const obj2gltf = require('obj2gltf');
const fs = require('fs');
obj2gltf('./ToGltf/obj/2.obj')
	.then(function(gltf) {
		const data = Buffer.from(JSON.stringify(gltf));
		fs.writeFileSync('./Output/model4.gltf', data);
	});