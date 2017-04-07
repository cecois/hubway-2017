var BaseLayersCollection = Backbone.Collection.extend({
	model: BaseLayer,
	url: function() {
		return null
	},
	initialize: function(options) {
		options || (options = {});
		this.listenTo(appState,'change:baselayer',this.preswitch)
	},
	activate: function(nl) {


		var nm = this.findWhere({
			name: nl
		})
		nm.set({
			active: true
		})

		return this

	},
	preswitch: function() { // we don't trust the incoming layers arr to always be clean


var ol = this.findWhere({active:true})

ol.set({active:false},{silent:true}) //silent bc we are gonna set true next and that's gonna trigger

var tl = this.findWhere({name:appState.get("baselayer")})
tl.set({active:true})


		return this

	},
	switch: function(nn) {


		this.invoke('set', {
			"active": false
		}, {
			silent: true
		});
		return this
		.activate(nn)
	},

});