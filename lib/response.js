module.exports.init = app => {

	app.context.done = app.response.done = function(data,errorLevel,msg){
		this.body = {
      err: {
        level: errorLevel || 0,
        msg: msg || null
      },
      data: data || null
    }
	}

	app.context.doneWithError = app.response.doneWithError = function(errMsg){
		this.done(null,3,errMsg || null)
	}

	app.context.download = app.response.download = function(filepath){
		const fs = require('fs')
		const fileData = fs.readFileSync(filepath)
		let lastIndex = filepath.lastIndexOf('\\')
		lastIndex = lastIndex === -1 ? filepath.lastIndexOf('/') : lastIndex
		const filename = lastIndex === -1 ? filepath : filepath.slice(lastIndex+1)
		this.set('Content-disposition','attachment;filename='+filename)
		this.body = fileData
	}

	app.context.json = app.response.json = function(json){
		// util from https://github.com/koajs/is-json
		function isJSON(body) {
		  if (!body) return false;
		  if ('string' == typeof body) return false;
		  if ('function' == typeof body.pipe) return false;
		  if (Buffer.isBuffer(body)) return false;
		  return true;
		}
		if(!isJSON(json))
			throw new TypeError('not valid json')
		else {
			if (!this.get('Content-Type')) {
		    this.set('Content-Type', 'application/json');
		  }
			this.body = json
		}
	}

	app.context.send = app.response.send = function(data){
		this.body = data || ''
	}

	app.context.with = app.response.set = function(setting){
		// HTTP STATUS
		if(setting.status)
			this.status = setting.status
		// HTTP HEADER
		if(setting.header || setting.headers){
			const headers = setting.header || setting.headers
			this.set(headers)
		}
		return this
	}

	app.context.withStatus = app.response.withStatus = function(statusCode){
		return this.with({
			status: statusCode
		})
	}

	app.context.withHeader = app.context.withHeaders = app.response.withHeader = app.response.withHeaders = function(header){
		return this.with({
			header: header
		})
	}

}