// Importing necessary modules from mongoose
import { StreetAddress } from "@/app/types/User";
import { model, models, Schema, Document, Model } from "mongoose";

// Defining an interface for the order document
interface IOrder extends Document {
  userEmail?: string;
  phone?: string;
  streetAddress: StreetAddress;
  postalCode?: string;
  city?: string;
  country?: string;
  cartProducts?: Record<string, unknown>;
  paid?: boolean;
}

// Creating a new schema for order
const OrderSchema: Schema<IOrder> = new Schema(
  {
    userEmail: String,
    phone: String,
    streetAddress: {
      type: new Schema({
        streetName: String,
        houseNumber: String,
        stairwell: String,
        apartment: String,
      }),
    },
    postalCode: String,
    city: String,
    country: String,
    cartProducts: Object,
    paid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Creating the model for order
export const Order: Model<IOrder> =
  (models?.Order as Model<IOrder>) || model<IOrder>("Order", OrderSchema);
