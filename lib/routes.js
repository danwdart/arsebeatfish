module.exports = function(express, app, config, models) {
    var router = express.Router();

    router.get('/', function(req, res) {
        res.send('The server is working.');
    });


    for (var url in config.endpoints) {
        var endpoint = config.endpoints[url],
            Model = models[endpoint.model];
        switch (endpoint.type) {
            case 'auth':
                break;
            case 'rest':
                router.get(url, function(req, res) {
                    Model.find().then(function(data) {
                        return res.send(data);
                    });
                });
                router.get(url+'/:id', function(req, res) {
                    Model.findOne(req.params.id).then(function(model) {
                        if (!model)
                            return res.status(404).send({error: 'Not Found'});
                        return res.send(model);
                    });
                });
                router.post(url+'/:id', function(req, res) {
                    let model = new Model();
                    for (let key in req.body) {
                        let value = req.body[key];
                        model[key] = value;
                    }
                    model.save().then(function(data) {
                        return res.send(model);
                    });
                });
                router.put(url+'/:id', function(req, res) {
                    Model.findOne(req.params.id).then(function(model) {
                        if (!model)
                            return res.status(404).send({error: 'Not Found'});
                        for (let key in req.body) {
                            let value = req.body[key];
                            model[key] = value;
                        }
                        model.save().then(function(data) {
                            return res.send(model);
                        });
                    });
                });
                router.delete(url+'/:id', function(req, res) {
                    Model.remove({_id: req.params.id}).then(function(data) {
                        return res.status(204).send('');
                    })
                });
                break;
            default:
                throw new Error('Unknown type: '+endpoint.type);
        }
    }

    app.use('/', router);
};
