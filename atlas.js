var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://cecois:r0mjwrD61vaRhWKn@cl00-shard-00-00-uacod.mongodb.net:27017,cl00-shard-00-01-uacod.mongodb.net:27017,cl00-shard-00-02-uacod.mongodb.net:27017/hubway?ssl=true&replicaSet=CL00-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, db) {
	if(err){
		console.log(err);
	} else {
		
	}
  db.close();
});