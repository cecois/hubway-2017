//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
// require('./Config.js');

Config = {
  "mongodb":"hubway",
  "mongoport":"27017",
  "mongohost":"localhost"
}

var msg = null


/* ------------------------------------------------------------------------------------------ begin func ---- */

var mapper = function () {
  var key = {stationid:this.end_station_id}

  var value =
  {
    // tripduration:this.tripduration
    // ,starttime:this.starttime
    // ,stoptime:this.stoptime
    // start_station_id:this.start_station_id
    // ,start_station_name:this."start station name"
    // ,start_station_latitude:this."start station latitude"
    // ,start_station_longitude:this."start station longitude"
    end_station_id:this.end_station_id
    // ,end_station_name:this."end station name"
    // ,end_station_latitude:this."end station latitude"
    // ,end_station_longitude:this."end station longitude"
    // bikeid:this.bikeid
    // ,usertype:this.usertype
    // ,birth_year:this."birth year"
    // ,gender:this.gender
  }
  emit(key,1)

} //mapper


var reducer = function(key,values){


  return Array.sum(values);

}

// };


//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://'+Config.mongohost+':'+Config.mongoport+'/'+Config.mongodb;
// Use connect method to connect to the Server
MongoClient.connect(url, {connectTimeoutMS:480000,socketTimeoutMS:480000},function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    // Get the documents collection
    var collx = db.collection('rides');
    collx.mapReduce(mapper.toString(), reducer.toString(), {
      out:'bystation_end'
    }, function(e, c) {
      if(e){
        console.log("e:")
        console.log(e)
      } else {
        console.log("c:")
        console.log(c)
      }
      process.exit(1);
    });

  }
});