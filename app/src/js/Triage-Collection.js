var TriageCollection = Backbone.Collection.extend({
	model: Triager,
	url: function() {
		return null
	},
	initialize: function(models, options) {
		options || (options = {});
	}

});