var mongoose = require('mongoose');

module.exports = function db(config) {
    var models = [];

    if ('mongo' !== config.db.type)
        throw new Error('Non-mongo is not yet implemented');

    mongoose.connect('mongodb://'+config.db.host+'/'+config.db.name);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        for (var key in config.schemata) {
            var schema = config.schemata[key];
            models[key] = mongoose.model(key, mongoose.Schema(schema));
        }
    });

    return models;
};
