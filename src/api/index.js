var app = require('express')();
var moment = require('moment');

app.get('/api/v1/test', function (req, res) {
    res.json({
        result: 'Hello from Server',
        date: moment().unix()
    });
});


var server = app.listen(8001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listen http://%s:%s', host, port);
});
