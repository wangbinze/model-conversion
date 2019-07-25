
function onUpload(file) {

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
		//调用gltfShow  需要传参
		gltfShow(url);
		console.log('成功显示gltf文件');
	} else if (file.name.slice(-4) == '.obj') {
		//调用objShow
		objShow(url);
		console.log('11')
	} else if (file.name.slice(-4) == '.dae') {
		daeShow(url);
		console.log('22')
	} else {
		alert('请上传正确的文件')
	}

}
