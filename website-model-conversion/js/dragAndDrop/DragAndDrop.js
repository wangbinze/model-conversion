function toggleDisplay(id) {
	var el = document.getElementById(id);

	el.style.display = el.style.display === 'block' ? 'none' : 'block';

	return false;
}

document.addEventListener('DOMContentLoaded', function (event) {
	function clearCons() {
		var cons = document.getElementById('console');
		if ('directory' in document.getElementById('fileInput')) {
			cons.innerHTML = 'Use one of the above methods to show files here...';
		} else {
			cons.innerHTML = '不支持目录上载。则仅支持Chrome 25+。.';
		}
	}

	clearCons();

	function printToScreen() {
		var cons = document.getElementById('console');

		cons.innerHTML += '<br>';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];

			cons.innerHTML += '<br>';

			if (arg.constructor === File) {
				arg = 'file name: ' + arg.name + '; type: ' + arg.type;
				// 文件转化成二进制文件
				var blob = new Blob([arg]),
					//转化成url
					url = URL.createObjectURL(blob);
				console.log(url);
			}

			cons.innerHTML += arg;
		}
	}

	/** 文件输入 **/
	document.getElementById('fileInput').addEventListener('change', function () {
		clearCons();

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

		// 首先遍历所选的文件和目录
		if ('getFilesAndDirectories' in this) {
			this.getFilesAndDirectories().then(function (filesAndDirs) {
				iterateFilesAndDirs(filesAndDirs, '/');
			});
		}
	});

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

		clearCons();

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
