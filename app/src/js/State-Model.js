var State = Backbone.Model.extend({
	defaults: {
		"downout": "out",
		"slug": "home",
		"bbox": "-180,-89,180,89",
		"baselayer": null,
		"query": "",
	},
	initialize: function(options) {
		options || (options = {});
		// this.on('change:non', this.layerize, this)
		// this.on('change', this.pullurl, this)
		// this.listenTo(map, 'moveend', this.upbbox)
		return this
	},
	upbbox: function(){
		var bbx = map.getBounds().toBBoxString();
		if(this.get("bbox")!==bbx){
			this.set({bbox:bbx})
		}

		return this

	},
	toggle: function(which) {

		var whi = (typeof which == 'undefined') ? "split" : which;

		switch (this.get("downout")) {
			case "split":
			wh = "out"
			break;
			case "down":
			wh = "out"
			break;
			case null:
			wh = 'nil'
			break;
			default:
			wh = whi
		}

		this.set({
			downout:
			wh
		})

		return this

	},
	pullurl: function() {

		var uslug = this.get("slug")
		var ublayer = this.get("baselayer")
		var udownout = this.get("downout")
		var ubbox = this.get("bbox")

		var state = "#" + uslug + "/" + ublayer + "/" + udownout + "/"
//+ ubbox

return state

		// /pullurl
	}
});
