import config from './config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import clientSessions from 'client-sessions';

export default async app => {
  config.database && mongoose.connect(
    config.database.params.connection_string,
    {
      useNewUrlParser: true
    }
  );

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  config.sessions && app.use(clientSessions(config.sessions));
  
  config.templates &&
    app.engine(config.templates.type, (await import(config.templates.type)).default.__express) &&
    app.set('view engine', config.templates.type);

  config.pages && config.pages.forEach(pageConfig => {
    app.get(pageConfig.route, (req, res) => {
      //req.headers
      if (pageConfig.template) {
        res.render(pageConfig.template, pageConfig.parameters);
      }
    });
  });

  config.static && app.use(express.static(`__dirname${config.static}`));

  config.collections && config.collections.forEach(schema => {

  });

  config.auth && config.auth.forEach(authConfig => {

  });
};