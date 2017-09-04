module.exports.init = app => {

	app.context.done = app.response.done = function(data,errorLevel,msg){
		this.body = {
      err: {
        level: errorLevel || 0,
        msg: msg || ''
      },
      data: data || null
    }
	}

	app.context.doneWithError = app.response.doneWithError = function(errMsg){
		this.body = {
      err: {
        level: 3,
        msg: errMsg
      },
      data: null
    }
	}

	app.context.json = app.response.json = function(json){
		this.body = json
	}

	app.context.endWithStatus = app.response.endWithStatus = function(statusCode){
		this.body.status = statusCode
	}

}