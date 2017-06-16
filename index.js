var express = require('express');
var app = express();
var service = require('./todoService');



app.get('/', (req, res) => {
    service.get().then((items) => {
        res.send(items);
    });
})


app.get('/insert/:text/:completed', (req, res) => {
    service.insert(req.params.text, req.params.completed)
        .then(() => {
            res.send('record inserted');
        })
        .catch(err => {
            res.send('failed to insert');
        })
});

app.get('/:id', (req, res) => {
    service.find(req.params.id).then((item) => {
        res.send(item);
    }).catch(err => {
        res.send('An error occurred: ' + err);
    });
})




app.listen('3000', function () {
    console.log('app running on port 3000');
})
