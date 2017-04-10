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


/*
// top 10 loneliest starting stations
var C = 'bystation_start'

var DE =db.collection(C).find();

DE.toArray(function(err, docs) {

  console.log(__.first(__.sortBy(docs,'value'),10));

  CEEBEE()
}); //toarray
*/


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
    // ,{bikeid: 1927}
    // ,{bikeid: 1897}
    ] }
    );

DE.toArray(function(err, docs) {

  // console.log(docs)
  var events = []

  __.each(docs,function(D){


    var yr = D.starttime.split("-")[0];
    var mo = D.starttime.split("-")[1];
    var da = D.starttime.split("-")[2].split(" ")[0];
    var by = (D.birth_year=="\\N")?null:D.birth_year;
    var ho = D.starttime.split("-")[2].split(" ")[1].split(":")[0]
    var mi = D.starttime.split("-")[2].split(" ")[1].split(":")[1]
    var se = D.starttime.split("-")[2].split(" ")[1].split(":")[2]

    var sd = {year:yr,month:mo,day:da,hour:ho,minute:mi,second:se}

    var slid = "bike-"+D.bikeid+"-on-"+yr+mo+da

    var t = '';
    switch (slid) {
     case "bike-1741-on-20160927":
     t="An allegedly 115 year-old Hubway subscriber rode #1741 away from Bennington St@Byron St and returned the bike 4.2 minutes later. It was the first ride of 2016 for 1741. Also the last :-("
     break;
     case "bike-1895-on-20161010":
     t="A random rider grabbed #1895 for the first of two rides in 2016. It would be sixty minutes of bliss for the bike, and 2016 would <span class='trigger-hub' data-id='bike-1895-on-20161016'>only get better</span> six days later. But that would be it for the year :-("
     break;
     case "bike-1895-on-20161016":
     t="Things must have been looking up for #1895 when, for the second time in a week (<span class='trigger-hub' data-id='bike-1895-on-20161010'>first here</span>), a random rider sat on it for over an hour. The trip originated and terminated at Orient Heights and the bike must have been jazzed about how Autumn was shaping up. It then sat dormant through a chilly Winter. Soon it was 2017 :-("
     break;
     case "bike-1891-on-20161016":
     t="Another lonely Orient Heights soul waited through October to see any butts (see #1895's <span class='trigger-hub' data-id='bike-1895-on-20161010'>sad tale</span>). Then on the afternoon of October 16 - over two full hours of full-on rando action! Who knows where they went, but 1891 returned to Orient Heights later that afternoon and must have felt like a killer. It wouldn't be until <span class='trigger-hub' data-id='bike-1891-on-20161227'>after Christmas</span> that anyone called on it again :-("
     break;
     case "bike-1891-on-20161227":
     t="After a glorious (albeit solitary) burst of action <span class='trigger-hub' data-id='bike-1891-on-20161016'>in October</span>, #1891 idled with a cold, cold seat through the remainder of October and September. Thanksgiving came and went with nary a Pilgrim's pride to toast its saddle. Then Christmas. Still nothing. Two days later a 19 year-old subscriber rode it to Central Square and walked away. End of 2016 for #1891 :-("
     break;
     case "bike-1737-on-20161108":
     t="Thanksgiving was just around the corner when #1737's services were first requested in 2016. By a stranger at the Bennington@Byron station. But wowy wow - for four hours! What a turnaround! It <span class='trigger-hub' data-id='bike-1737-on-20161224'>seemed</span> :-("
     break;
     case "bike-1737-on-20161224":
     t="A bittersweet Christmas Eve for #1737 when, for only the second time in 2016, a stranger straddled its saddle and spun around Eastie for over an hour. Ignored <span class='trigger-hub' data-id='bike-1737-on-20161108'>since November</span>, one can only hope Santa brought something comforting because Bennington/Byron is where the bike stayed the rest of the calendar year :-("
     break;
     case "bike-1716-on-20161224":
     t="At 9am on Christmas Eve 2016 #1716 must have felt quite the princess of Boston. Its first ride of the year and by an 18-year-old subscriber, no less. Eleven minutes later it was dumped at Orient Heights to idly witness the year expire :-("
     break;
     case "bike-1301-on-20161229":
     t="The New Year loomed. Christmas had come and gone. The death of winter had settled all. Everybody and everything had aged another year. The gift of a single rider hadn't yet materialized for poor old #1301. Lump of coal stuff. Then on December 29th a 49 year-old subscriber picked up at Tremont@Newton and rode all the way to Mayor Martin J. Walsh station. Straight to City Hall for 1301! It's impossible to prove just which Boston resident rode 1301 that morning but Marty Walsh *was* born in 1967 and *does* frequent City Hall. Could be 2016 ended regally for ol' 1301 - nestled up under Marty Walsh's warm Mayoral fissure."
     break;
     default:
     t="default"
   }

   var txt = {text:t,headline:"Bike #"+D.bikeid+" on "+yr+"."+mo+"."+da}

   var DR = {
    start_station_name:D.start_station_name
    ,slideid:slid
    ,duration_m:D.tripduration/60
    ,end_station_name:D.end_station_name
    ,start_station_longitude:D.start_station_longitude
    ,start_station_latitude:D.start_station_latitude
    ,end_station_longitude:D.end_station_longitude
    ,end_station_latitude:D.end_station_latitude
    ,text:txt,tripduration:D.tripduration,bikeid:D.bikeid,birth_year:by,gender:D.gender,start_date:sd
  }
  if(D.start_station_name.indexOf("8D OPS")<0){
    events.push(DR)}

  })

var E = {events:events}
console.log(JSON.stringify(E))

CEEBEE()
}); //toarray


/*
// top 10 loneliest bikes
var DE =db.collection('lowest_bikes').find();

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