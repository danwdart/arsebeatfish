import config from './config';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import clientSessions from 'client-sessions';

import model from './model';

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
      } else {
        res.status(200).json(pageConfig.parameters);
      }
    });
  });

  config.static && app.use(express.static(`__dirname${config.static}`));

  config.collections && config.collections.forEach(schema => {
    const modelSchema = model(schema);
    app.get(`/${schema.name}`, async (req, res) =>
      res.status(200).json(await modelSchema.find())
    );
    app.get(`/${schema.name}/:id`, async (req, res) => {
      try {
        res.status(200).json(await modelSchema.findOne({_id: req.params.id}))
      } catch (err) {
        res.status(404).json({error: 'Not Found'});
      }
    });
    app.post(`/${schema.name}`, async (req, res) => {

    });
    app.put(`/${schema.name}/:id`, async (req, res) => {

    });
    app.patch(`/${schema.name}/:id`, async (req, res) => {

    });
    app.delete(`/${schema.name}/:id`, (req, res) => {

    });
  });

  config.auth && config.auth.forEach(authConfig => {

  });
};