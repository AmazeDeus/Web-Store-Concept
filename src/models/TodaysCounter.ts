// Importing necessary modules from mongoose
import { model, models, Schema, Document, Model } from "mongoose";

// Defining an interface for the menu item document
interface ITodaysCounter extends Document {
  image?: string;
}

// Creating a new schema for menu item
const TodaysCounterSchema: Schema<ITodaysCounter> = new Schema(
  {
    image: { type: String },
  },
  { timestamps: true }
);

// Creating the model for menu item
export const TodaysCounter: Model<ITodaysCounter> =
  (models?.TodaysCounter as Model<ITodaysCounter>) ||
  model<ITodaysCounter>("TodaysCounter", TodaysCounterSchema);
