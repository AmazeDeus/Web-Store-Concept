// Importing necessary modules from mongoose
import mongoose, { model, models, Schema, Document, Model } from "mongoose";

// Defining an interface for the extra price document
interface IExtraPrice extends Document {
  name: string;
  price: number;
}

// Creating a new schema for extra price
const ExtraPriceSchema: Schema<IExtraPrice> = new Schema({
  name: String,
  price: Number,
});

// Defining an interface for the menu item document
interface IMenuItem extends Document {
  image?: string;
  name?: string;
  description?: string;
  category?: mongoose.Types.ObjectId;
  basePrice?: number;
  sizes?: IExtraPrice[];
  extraIngredientPrices?: IExtraPrice[];
}

// Creating a new schema for menu item
const MenuItemSchema: Schema<IMenuItem> = new Schema(
  {
    image: { type: String },
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Types.ObjectId },
    basePrice: { type: Number },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredientPrices: { type: [ExtraPriceSchema] },
  },
  { timestamps: true }
);

// Creating the model for menu item
export const MenuItem: Model<IMenuItem> =
  (models?.MenuItem as Model<IMenuItem>) ||
  model<IMenuItem>("MenuItem", MenuItemSchema);
