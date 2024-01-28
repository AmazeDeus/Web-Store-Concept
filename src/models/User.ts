// Importing necessary modules from mongoose
import { model, models, Schema, Document, Model } from "mongoose";

// Defining an interface for the user document
interface IUser extends Document {
  name?: string;
  email: string;
  password?: string;
  image?: string;
}

// Creating a new schema for user
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

// Creating the model for user
export const User: Model<IUser> =
  (models?.User as Model<IUser>) || model<IUser>("User", UserSchema);
