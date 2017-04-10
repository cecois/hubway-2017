var RidesView = Backbone.View.extend({
	events: {
	},
	initialize: function() {
		GLJ = L.featureGroup()
		.addTo(map);

		this.collection.bind('sync', this.render, this);

	}
	,render: function(){

		GLJ.clearLayers();
		GLJ.clearAllEventListeners();

		_.each(this.collection.models,function(R){

			var circle = L.circle([R.get("start_station_latitude"), R.get("start_station_longitude")], UTIL.get_style('hub'))
			circle.bindPopup(R.get("text").headline)
			.addTo(GLJ);

			if(R.get("slideid")==timeline.current_id){
				circle.openPopup();
			}

		})

// we know this
map.fitBounds([[42.303467780728276,-71.2786102294922],[42.429538632268276,-70.7842254638672]]);

return this

}
});