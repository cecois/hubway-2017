var SubmitView = Backbone.View.extend({
	el: $("#inputContainer"),
	template: Handlebars.templates['SubmitFormViewTpl'],
	events: {
		"keyup": "report",
		// "click #bt-query": "execute_by_click"
	},
	initialize: function() {
		NEXT = L.featureGroup()
		.addTo(map);
		this.render()
		// this.model.bind("change:query", this.render, this)
		// this.listenTo(appState, 'change:query', this.prequery);
		// this.listenTo(appState, 'change:query', this.render);
		return this
	},
	report:function(e){

		if($("#graffiti-submission").val().length==0){
			if(NEXT.getLayers().length>0){
			// var og = $("#graffiti-submission").val();
			NEXT.clearLayers()
		}
	} else {

		if(NEXT.getLayers().length<1)
		{
			var envold = turf.bboxPolygon(GLJ.getBounds().toBBoxString().split(","))

			var oldwest = envold.geometry.coordinates[0][0][0]
			var oldsout = envold.geometry.coordinates[0][0][1]
			var oldeast = envold.geometry.coordinates[0][1][0]
			var oldnort = envold.geometry.coordinates[0][2][1]


			var bb = [parseFloat(oldeast),-80,parseFloat(oldeast)-1,80];

			var NEXTPT = turf.random('points', 1, {
				bbox: bb
			});


			var cntr = turf.getCoord(NEXTPT.features[0]);

			var cntrlat = cntr[1]
			var cntrlng = cntr[0]
			var bbm = [cntrlat,cntrlng]

			if(map.getBounds().contains(bbm) == false){

				map.panTo(bbm)
			}



			var xpp = L.geoJson(NEXTPT, {
				style: function(fea, lay) {
					return UTIL.get_style()
				},
				pointToLayer: function(feature, latlng) {
					var micon = L.divIcon({className: 'stall-div-new',html:null});
					return L.marker(latlng, {icon: micon})
				}

			}).addTo(NEXT)

		} // if NEXT.getLayers().length<1

	}

	return this
	.populate_report()


}
,populate_report: function(){

	$(".stall-div-new").html($(this.el).find("#graffiti-submission").val());

	return this

}
,execute_by_click: function() {

	var qv = $(this.el).find("#inputContainer input").val()



	$("#triageContainer").toggle()

	appState.set({
		query: qv,
		slug: "search"
	})
	return this


},
render: function() {
	$(this.el).html(this.template(this.model.toJSON()))
	return this
},
	delay: function(event) { //  tnx http://stackoverflow.com/questions/6756381/jquery-backbone-js-delay-function-call
		var self = this;
		if (self.timer)
			clearTimeout(self.timer);
		self.timer = setTimeout(function() {

// after delay, fire preprequery
self.preprequery()

self.timer = null;
}, 500);

		return this
	},
	preprequery: function(g) {


// grab val() of user's entry
var qv = $(this.el).find("input").val()

appState.set({
	query: qv
})
return this
},
prequery: function(g) {


	var qv = appState.get("query")

		switch (true) { //let's try to catch coordinate input
		case (!isNaN(qv.split(",")[0]) && !isNaN(qv.split(",")[1]) && (qv.split(",").length > 2 && qv.split(",")[2].indexOf("m") > -1)):
				var typ = "coords" //point with a 3rd param - radius in meters
				break;
				case (qv.split(",").length == 1):
				var typ = "string"
				break;
				case (_.every(qv.split(","), function(c) {
					return !isNaN(c)
				})):
				var typ = "coords" //poly
				break;
				default:
				var typ = "string"
			}


		if (typ == "coords") { //if these are coordinates, we are gonna pass in quite a different object (e.g. not a nominatim geom but a custom)

			triageCoordz.set({
				coordzin: qv
			})

// we need to mutate into geojson (possibly buffering when necessary)
var element = triageCoordz.as_choice()


triagePlaces.reset()

var llgodelement = element
llgodelement.llgod_type = "aoi_custom"
triagePlaces.push(llgodelement)



return this
} else {


	var service_url = 'http://nominatim.openstreetmap.org/search.php?limit=5&format=jsonv2&q=' + qv;

	triagePlaces.reset()

			// TEMPORARY DISABLED SO WE DON'T HIT NOMINATIM TOO HARD DURING TESTING
			if(Config.MODE!=="bus"){
				$.getJSON(service_url, null, function(response) {
					$.each(response, function(i, element) {
						var llgodelement = element
						llgodelement.llgod_type = "aoi_nom"
						triagePlaces.push(llgodelement)
					});
				});}



				return this
		} //wasn't coords - we propogate the query string to nominatim and solr
	}
})