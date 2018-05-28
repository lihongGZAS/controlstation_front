'use strict';

exports.request = function(app){
	app.get('/controlstation/common/exit', function(req, res) {
		var data={
			state:'1',
			message:'error'
		};
	  res.send(data);
	});
};