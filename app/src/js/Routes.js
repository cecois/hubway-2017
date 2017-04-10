var Route = Backbone.Router.extend({
    routes: {
        "(:slug)(/:baselayer)(/:downout)(/:bbox)(/)": "default"
    },
    initialize: function(options) {
        options || (options = {});
        appState.on("change", this.update, this);
        return this;
    },
    update: function() {
        console.log("checking for updated state")
        if (appState.hasChanged() == true) {
            console.log("state changed, navigating...")
            appRoute.navigate(appState.pullurl(), {
                trigger: true,
                replace: false
            });
        } else {
            console.log("state has not changed, no navigation required");
        }
        return this;
    },
    default: function(slug, baselayer, downout, bbox) {
        var zslug = typeof slug !== "undefined" && slug !== null ? slug : "home";
        var zblayername = baselayer == "nil" || typeof baselayer == "undefined" || baselayer == null ? mapBaseLayers.findWhere({
            active: true
        }).get("name") : baselayer;
        var zdownout = typeof downout !== "undefined" && downout !== null && downout !== "nil" ? downout : "out";
        var zbbox = typeof bbox !== "undefined" && bbox !== null && bbox !== "null" && bbox !== "nil" ? bbox : appState.get("bbox");
        appState.set({
            downout: zdownout,
            slug: appState.get("slug") !== zslug ? zslug : appState.get("slug"),
            bbox: zbbox,
            baselayer: zblayername
        });
    }
});

var appRoute = new Route();

Backbone.history.start();