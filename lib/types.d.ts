import { SchemaDefinition } from "mongoose";
import { Request as ExpressRequest } from "express";

export interface IAuthConfig {
  type: string;
  params: object;
}

export interface IPage {
  route: string;
  template: string;
  parameters: object;
}

export interface ISchema {
  name: string;
  fields: SchemaDefinition;
}

export interface IRequest extends ExpressRequest {
 session?: {
  passport?: {
    user?: any
  }
 };
}