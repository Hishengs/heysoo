'use strict';

const fs = require('fs');
const path = require('path');

// 获取目录js文件
exports.getFolderFiles = (folderPath) => {
	try {
		let files = fs.readdirSync(path.join(process.cwd(),folderPath)).filter(function(file){
	    return fs.statSync(path.join(process.cwd(),folderPath+file)).isFile() && file.slice(-3) === '.js';
	  });
	  return files;
	}catch (e){
		return [];
	}
}