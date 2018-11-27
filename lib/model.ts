import mongoose, { SchemaDefinition } from "mongoose";

interface ISchema {
    name: string;
    fields: SchemaDefinition;
}

export default (schema: ISchema) => mongoose.model(
    schema.name,
    new mongoose.Schema(schema.fields),
);
