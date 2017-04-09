var FS = require('fs')
,assert = require('assert')
,__ = require('underscore')
,J2CSV = require('json2csv')
;

var fields = ["station_id"
,"name"
,"short_name"
,"lat"
,"lon"
,"region_id"
,"capacity"]


var stations = require('./station_information-rdx.json');

__.each(stations.stations,function(S){

try {
  var result = J2CSV({ data: S, fields: fields });
  console.log(result);
} catch (err) {
  // Errors are thrown for bad options, or if the data is empty and no fields are provided. 
  // Be sure to provide fields if it is possible that your data array will be empty. 
  console.error(err);
}
  

})
// 
// console.log(__.first(stations.stations));

    
