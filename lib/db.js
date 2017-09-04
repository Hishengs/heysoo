'use strict';

const path = require('path');
const getFolderFiles = require('./util.js').getFolderFiles;

exports.init = (app) => {
	// 数据库配置
	let config = app.config;

  if(!config.database.enabled){
    app.debug('[warning] database has not enabled.');
  }else if(!config.database.dbname){
    app.debug('[warning] no database specified, please check you database config.');
  }else {

    try {

      const modelPath = `./${config.folder.app}/${config.folder.model}/`;
      const files = getFolderFiles(modelPath);

      if(config.database.orm === 'sequelize'){
        const Sequelize = require('sequelize');
        const ormInstance = new Sequelize(config.database.dbname,config.database.username,config.database.password,{
          host    : config.database.host || 'localhost',
          dialect : config.database.type || 'mysql',
        });
        app.ormInstance = app.context.ormInstance = ormInstance;
        app.db = app.context.db = ormInstance;

        const modelModule = {};

        for(let i=0,ilen=files.length;i<ilen;i++){
          const model = require(path.join(app.basePath,modelPath+files[i]))(app.ormInstance,Sequelize.DataTypes);
          model.sync();
          modelModule[ files[i].slice(0,-3) ] = model;
        }

        app.model = app.context.model = modelModule;
      }
      else if(config.database.orm === 'bookshelf'){
        const Bookshelf = require('bookshelf');
        const knex = require('knex');
        const ormInstance = Bookshelf(knex({
          client: config.database.type || 'mysql',
          connection: {
            host     : config.database.host || 'localhost',
            user     : config.database.username,
            password : config.database.password,
            database : config.database.dbname,
            charset  : config.database.charset || 'utf8'
          }
        }));
        app.ormInstance = app.context.ormInstance = ormInstance;

        const modelModule = {};

        for(let i=0,ilen=files.length;i<ilen;i++){
          const model = require(path.join(app.basePath,modelPath+files[i]))(app.ormInstance);
          modelModule[ files[i].slice(0,-3) ] = model;
        }

        app.model = app.context.model = modelModule;
      }
      else app.debug('[warning] unsupported orm.');

        
      
      app.debug('database init done.');

    }catch (e){
      e.message = '[error] database init failed, please check you database config.\n' + e.message;
      throw e;
    }

  }

}