var couchbase = require('couchbase');
var json2csv = require('json2csv');
var constants = require('./constants');

var cluster = new couchbase.Cluster(constants.config.cluster);
cluster.authenticate(constants.creds.username, constants.creds.password);
var bucket = cluster.openBucket(constants.config.bucket);
var q = couchbase.N1qlQuery;


(function () {
    bucket.query(
        q.fromString(constants.query),
        function (err, rows) {
            // console.log("RESULT: %j", rows);

            var fields = constants.config.fields;
            var opts = {
                fields
            };

            // console.log(rows);
            json2csv.parseAsync(rows, opts)
                .then(res => console.log(res))
                .then(() => console.log('PROCESSING COMPLETE'))
                .catch(err => console.log(err));
        });
    return;
})()