import { SchemaDefinition } from "mongoose";

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
