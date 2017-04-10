var RidesCollection = Backbone.Collection.extend({
	model: Panel,
	url: function() {
		// static dump
		return "assets/offline/hubway-bybike-bottom-ten-bikes-rides.json";

	},
	initialize: function(options) {
		options || (options = {});
	}
	,parse: function(response) {

		return response.events
	}


});