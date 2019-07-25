function obj2gltf(url) {
	const obj2gltf = require('obj2gltf');
	const fs = require('fs');
	obj2gltf(url)
		.then(function (gltf) {
			const data = Buffer.from(JSON.stringify(gltf));
			fs.writeFileSync(toUrl, data);
			console.log(url);
		})
}
