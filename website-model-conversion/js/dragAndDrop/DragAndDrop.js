function toggleDisplay(id) {
	var el = document.getElementById(id);

	el.style.display = el.style.display === 'block' ? 'none' : 'block';

	return false;
}

document.addEventListener('DOMContentLoaded', function (event) {

	function printToScreen() {

		for (var i = 0; i < arguments.length; i++) {
			if (i % 2 != 0) {
				var arg = arguments[i];
				console.log(arguments[i]);
				// 文件转化成二进制文件
				var blob = new Blob([arg]),
					//转化成url
					url = URL.createObjectURL(blob);
				console.log(url);   //输出了两次，包含了“/”和url
				console.log(arg.name);   //输出了两次，包含了“undefined”和name

				//展示模型
				initGltf(url);
				animate();
			}
		}
	}


	/**  拖拽上传 **/
	function dragHover(e) {
		e.stopPropagation();
		e.preventDefault();

		if (e.type === 'dragover') {
			e.target.className = 'over';
		} else {
			e.target.className = '';
		}
	}

	document.getElementById('dropDiv').addEventListener('dragover', dragHover);
	document.getElementById('dropDiv').addEventListener('dragleave', dragHover);

	document.getElementById('dropDiv').addEventListener('drop', function (e) {
		e.stopPropagation();
		e.preventDefault();


		e.target.className = '';

		var uploadFile = function (file, path) {
			printToScreen(path, file);
			// 处理文件上传
		};

		var iterateFilesAndDirs = function (filesAndDirs, path) {
			for (var i = 0; i < filesAndDirs.length; i++) {
				if (typeof filesAndDirs[i].getFilesAndDirectories === 'function') {
					var path = filesAndDirs[i].path;

					// 此递归可以深入遍历目录
					filesAndDirs[i].getFilesAndDirectories().then(function (subFilesAndDirs) {
						// 遍历子目录中的文件和目录
						iterateFilesAndDirs(subFilesAndDirs, path);
					});
				} else {
					uploadFile(filesAndDirs[i], path);
				}
			}
		};

		//	首先遍历所选的文件和目录
		if ('getFilesAndDirectories' in e.dataTransfer) {
			e.dataTransfer.getFilesAndDirectories().then(function (filesAndDirs) {
				iterateFilesAndDirs(filesAndDirs, '/');
			});
		}
	});
});
