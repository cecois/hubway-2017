var Db = require('mongodb').Db,
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
ReplSetServers = require('mongodb').ReplSetServers,
ObjectID = require('mongodb').ObjectID,
Binary = require('mongodb').Binary,
GridStore = require('mongodb').GridStore,
Grid = require('mongodb').Grid,
Code = require('mongodb').Code,
// FS = require('fs'),
BSON = require('mongodb-core').BSON
,assert = require('assert')
,__ = require('underscore')
// ,J2CSV = require('json2csv')
;

Config = {
  "mongodb":"hubway",
  "mongoport":"27017",
  "mongohost":"localhost"
}

var url = 'mongodb://'+Config.mongohost+':'+Config.mongoport+'/'+Config.mongodb;

var get_ridez = function(db, CEEBEE) {



// top 10 loneliest starting stations
var C = 'bystation_start'

var DE =db.collection(C).find();

DE.toArray(function(err, docs) {

  console.log(__.first(__.sortBy(docs,'value'),10));

  CEEBEE()
}); //toarray


/*
// top 10 loneliest bikes' rides
  var DE =db.collection('rides').find(
    { $or: [
      {bikeid: 1301}
      ,{bikeid: 1583}
      ,{bikeid: 1716}
      ,{bikeid: 1741}
      ,{bikeid: 1582}
      ,{bikeid: 1737}
      ,{bikeid: 1891}
      ,{bikeid: 1895}
      ,{bikeid: 1927}
      ,{bikeid: 1897}
      ] }
      );

  DE.toArray(function(err, docs) {



    CEEBEE()
}); //toarray
*/

/*
// top 10 loneliest bikes
  var DE =db.collection('bybike').find();

  DE.toArray(function(err, docs) {

    console.log(__.first(__.sortBy(docs,'value'),10));

    CEEBEE()
}); //toarray
*/

}

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  get_ridez(db, function() {
    db.close();
  });
});