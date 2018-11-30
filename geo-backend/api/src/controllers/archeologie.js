"use strict";

var Hapi = require('hapi');


function ArcheologieController(){};
ArcheologieController.prototype = (function(){

	return {
		findByPoint: function findByID(geometry, attributes) {
			const data = {};
			for (var i = 0, len = attributes.length; i < len; i++) {
				data[attributes[i]]= "test";
			
			}
			
			return data ;
		},
		findByBbox: function findByID(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var params = request.plugins.createControllerParams(request.params);

			taskDAO.findByID(params, function (err, data) {
				helper.replyFindOne(err, data);
			});
		},
		findPolygon: function findByID(request, reply) {

			var helper = new ReplyHelper(request, reply);
			var params = request.plugins.createControllerParams(request.params);

			taskDAO.findByID(params, function (err, data) {
				helper.replyFindOne(err, data);
			});
		}
		
	}
})();

var archeologieController = new ArcheologieController();
module.exports = archeologieController;