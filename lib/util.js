const fs = require('fs');
const path = require('path');

// get js files from folder
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

// merge object from target to source
function merge (source, target){
  for(const key of Object.keys(target)){
    if(Object.prototype.hasOwnProperty.call(source, key)){
      const isObj = Object.prototype.toString.call(source[key]).slice(8, -1).toLowerCase() === 'object';
      if(isObj){
        source[key] = merge(source[key], target[key]);
      }else {
        source[key] = target[key];
      }
    }else {
      source[key] = target[key];
    }
  }
  return source;
}

module.exports = {
  getFolderFiles,
  merge,
};
