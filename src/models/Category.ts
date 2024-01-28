// Importing necessary modules from mongoose
import { model, models, Schema, Model, Document } from "mongoose";

// Defining an interface for the category document
interface ICategory extends Document {
  name: string;
}

// Creating a new schema for category
const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

// Creating the model for category
export const Category: Model<ICategory> =
  (models?.Category as Model<ICategory>) ||
  model<ICategory>("Category", CategorySchema);
