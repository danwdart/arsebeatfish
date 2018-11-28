import mongoose from "mongoose";

import { ISchema } from "./types";

export default (schema: ISchema) => mongoose.model(
    schema.name,
    new mongoose.Schema(schema.fields),
);
