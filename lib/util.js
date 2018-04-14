const fs = require('fs');
const path = require('path');

// 获取目录js文件
function getFolderFiles(folderPath){
  try {
    const files = fs.readdirSync(path.join(process.cwd(), folderPath)).filter((file) => {
      return fs.statSync(path.join(process.cwd(), folderPath + file)).isFile() && file.slice(-3) === '.js';
    });
    return files;
  }catch (e){
    return [];
  }
}

module.exports = {
  getFolderFiles,
};
