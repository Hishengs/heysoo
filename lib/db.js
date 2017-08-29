'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const getFolderFiles = require('./util.js').getFolderFiles;

exports.init = (app) => {
	// 数据库配置
	let config = app.config;
  if(!config.database.dbname){
    app.debug('[warning] no database specified, please check you database config.');
  }else {
    try {

      app.db = app.context.db = new Sequelize(config.database.dbname,config.database.username,config.database.password,{
        host: config.database.host || 'localhost',
        dialect: config.database.type || 'mysql',
      });

      let modelPath = `./${config.folder.app}/${config.folder.model}/`;
      let files = getFolderFiles(modelPath);
      let modelModule = {};
      for(let i=0,ilen=files.length;i<ilen;i++){
        let modelName = files[i].slice(0,-3);
        let model = require(path.join(app.basePath,modelPath+files[i]));
        if(model.keys){
          // 特殊处理
          let keyNames = Object.getOwnPropertyNames(model.keys);
          for(let j=0,jlen=keyNames.length;j<jlen;j++){
            if(model.keys[keyNames[j]].type.toLowerCase() === 'date' && model.keys[keyNames[j]].defaultValue && model.keys[keyNames[j]].defaultValue.toLowerCase() === 'now'){
              model.keys[keyNames[j]].defaultValue = Sequelize.DataTypes.NOW;
            }
            model.keys[keyNames[j]].type = 
            (model.keys[keyNames[j]].typeArgs &&  model.keys[keyNames[j]].typeArgs.length) ?
            Sequelize.DataTypes[model.keys[keyNames[j]].type.toUpperCase()]:
            Sequelize.DataTypes[model.keys[keyNames[j]].type.toUpperCase()].apply(Sequelize.DataTypes,model.keys[keyNames[j]].typeArgs);
          }
          modelModule[modelName] = app.db.define(modelName,model.keys,model.options);
        }
      }  
      app.model = app.context.model = modelModule;
      
      app.debug('database init done.');

    }catch (e){
      e.message = '[error] database init failed, please check you database config.' + e.message;
      throw e;
    }
  }
}