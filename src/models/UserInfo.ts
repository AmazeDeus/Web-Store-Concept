// Importing necessary modules from mongoose
import { model, models, Schema, Document, Model } from "mongoose";
import { StreetAddress } from "@/app/types/User";

// Defining an interface for the user info document
interface IUserInfo extends Document {
  email: string;
  streetAddress?: StreetAddress;
  postalCode?: string;
  city?: string;
  phone?: string;
  admin?: boolean;
}

// Creating a new schema for user info
const UserInfoSchema: Schema<IUserInfo> = new Schema(
  {
    email: { type: String, required: true },
    streetAddress: {
      type: new Schema({
        streetName: String,
        houseNumber: String,
        stairwell: String,
        apartment: String,
      }),
    },
    postalCode: { type: String },
    city: { type: String },
    phone: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Creating the model for user info
export const UserInfo: Model<IUserInfo> =
  (models?.UserInfo as Model<IUserInfo>) ||
  model<IUserInfo>("UserInfo", UserInfoSchema);
