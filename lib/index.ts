import bodyParser from "body-parser";
import clientSessions from "client-sessions";
import { Application, Response, static as expressStatic } from "express";
import mongoose from "mongoose";
import config from "./config";
import model from "./model";
import { IPage, IRequest, ISchema } from "./types";

export default async (app: Application) => {
  if (config.database) {
    mongoose.connect(
      config.database.params.connection_string,
      {
        useNewUrlParser: true,
      },
    );
  }

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  if (config.sessions) {
    app.use(clientSessions(config.sessions));
  }

  if (config.templates) {
    app.engine(config.templates.type, (await import(config.templates.type)).default.__express);
    app.set("view engine", config.templates.type);
  }

  if (config.pages) {
    config.pages.forEach((pageConfig: IPage) => {
      app.get(pageConfig.route, (_req: IRequest, res: Response) => {
        // req.headers
        if (pageConfig.template) {
          res.render(pageConfig.template, pageConfig.parameters);
        } else {
          res.status(200).json(pageConfig.parameters);
        }
      });
    });
  }

  if (config.static) {
    app.use(expressStatic(`__dirname${config.static}`));
  }

  if (config.collections) {
    config.collections.forEach((schema: ISchema) => {
      const modelSchema = model(schema);
      app.get(`/${schema.name}`, async (_req: IRequest, res: Response) =>
        res.status(200).json(await modelSchema.find()),
      );
      app.get(`/${schema.name}/:id`, async (req: IRequest, res: Response) => {
        try {
          res.status(200).json(await modelSchema.findOne({_id: req.params.id}));
        } catch (err) {
          res.status(404).json({error: "Not Found"});
        }
      });
      /*
      app.post(`/${schema.name}`, async (req: IRequest, res: Response) => {
        //
      });
      app.put(`/${schema.name}/:id`, async (req: IRequest, res: Response) => {
        //
      });
      app.patch(`/${schema.name}/:id`, async (req: IRequest, res: Response) => {
        //
      });
      app.delete(`/${schema.name}/:id`, (req: IRequest, res: Response) => {
        //
      });
      */
    });
  }

  /*if (config.auth) {
    config.auth.forEach((authConfig: IAuthConfig) => {
      //
    });
  }*/
};
