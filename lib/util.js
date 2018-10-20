const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// get js files from folder
function getFolderFiles(folderPath) {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), folderPath)).filter((file) => {
      return fs.statSync(path.join(process.cwd(), folderPath + file)).isFile() && file.slice(-3) === '.js';
    });
    return files;
  } catch (e) {
    return [];
  }
}

// merge object from target to source
function merge (source, target) {
  for (const key of Object.keys(target)) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const isObj = Object.prototype.toString.call(source[key]).slice(8, -1).toLowerCase() === 'object';
      if (isObj) {
        source[key] = merge(source[key], target[key]);
      } else {
        source[key] = target[key];
      }
    } else {
      source[key] = target[key];
    }
  }
  return source;
}

function isType (obj, type) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() === type;
}

function getType (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

function hash (text, hashType = 'md5', digest = 'hex') {
  const hashIns = crypto.createHash(hashType);
  hashIns.update(text);
  return hashIns.digest(digest);
}

function md5 (text) {
  return hash(text, 'md5');
}

function sha1 (text) {
  return hash(text, 'sha1');
}

module.exports = {
  getFolderFiles,
  merge,
  isType,
  getType,
  md5,
  sha1,
};
