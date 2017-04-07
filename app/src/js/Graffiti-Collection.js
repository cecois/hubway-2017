var GraffitiCollection = Backbone.Collection.extend({
	model: Panel,
	url: function() {
		// currently a static dump of fake data
		return "assets/offline/static.geojson";
		// return "https://pugo.carto.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM cbb_point where created_at >= '2017-03-15T12:52:12Z'"

		// ...but it will ultimately be a dynamic query that, in effect, handles the weekly "cleaning"
		// return "http://carto.com/some/query/with/date_added/newer/than/now"
	},
	initialize: function(options) {
		this.listenTo(appState, 'change:query', this.fetch);
		options || (options = {});
	}
	,parse: function(response) {

		appState.set({rawbox:response});


		return response.features
	}


});