const Logger = function(){}

Logger.prototype.log = function(){
	//
}

exports.init = app => {
	app.logger = new Logger();
}