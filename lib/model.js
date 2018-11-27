import mongoose from "mongoose";
export default (schema) => mongoose.model(schema.name, new mongoose.Schema(schema.fields));
