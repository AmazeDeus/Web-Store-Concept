import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import {
  userSchema,
  simpleUserSchema,
  menuItemSchema,
  todaysCounterSchema,
} from "./validation.js";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import { MenuItem } from "@/models/MenuItem";
import { TodaysCounter } from "@/models/TodaysCounter";
import { authOptions, isAdmin } from "../auth/[...nextauth]/route.js";
import { getServerSession } from "next-auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createUser(data) {
  try {
    mongoose.connect(process.env.MONGO_URL);

    // Validate data
    const validatedData = simpleUserSchema.parse(data);

    const pass = data.password;

    const salt = bcrypt.genSaltSync(10);

    data.password = bcrypt.hashSync(pass, salt);

    const createdUser = await User.create(data);

    return createdUser;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract error messages
      const errorMessages = error.errors.map((err) => err.message);
      throw new Error(`Invalid data: ${errorMessages.join(", ")}`);
    } else if (error.code === 11000 && error.message.includes("email")) {
      // Handle MongoDB duplicate key error for 'email'
      throw new Error("Email already exists");
    } else {
      // If it's not a ZodError or a MongoDB error, rethrow it
      throw error;
    }
  }
}

export async function updateUser(data) {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log(data);
    // Validate data
    const validatedData = userSchema.parse(data);

    const { _id, name, image, ...otherUserInfo } = data;

    let filter = {};

    if (_id) {
      filter = { _id };
    } else {
      const session = await getServerSession(authOptions);
      const email = session.user.email;
      filter = { email };
    }

    const user = await User.findOne(filter);

    if (user && user.image) {
      // Extract public_id from the old image URL
      const public_id = user.image.split("/").pop().split(".")[0];

      // Delete the old image from Cloudinary
      await new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(public_id, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        });
      });
    }

    await User.updateOne(filter, { name, image });

    const updatedUser = await UserInfo.findOneAndUpdate(
      { email: user.email },
      otherUserInfo,
      {
        upsert: true,
      }
    );

    console.log(updatedUser);

    return updatedUser;
  } catch (error) {
    console.log(error.stack);
    if (error instanceof z.ZodError) {
      // Group error messages by field
      const errorMessages = error.errors.reduce((acc, err) => {
        const field = err.path[0]; // Get the field name
        if (!acc[field]) {
          acc[field] = [];
        }
        acc[field].push(err.message);
        return acc;
      }, {});
      throw { error: errorMessages };
    } else if (error.code === 11000 && error.message.includes("email")) {
      // Handle MongoDB duplicate key error for 'email'
      throw new Error("Email already exists");
    } else {
      // If it's not a ZodError or a MongoDB error, rethrow it
      throw error;
    }
  }
}

export async function createMenuItem(data) {
  try {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URL);

    // Validate data
    const validatedData = menuItemSchema.parse(data);

    // Create menu item
    const menuItemDoc = await MenuItem.create(data);

    return menuItemDoc;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract error messages
      const errorMessages = error.errors.map((err) => err.message);
      throw new Error(`Invalid data: ${errorMessages.join(", ")}`);
    } else {
      // If it's not a ZodError, rethrow it
      console.log(error);
      throw error;
    }
  }
}

export async function updateMenuItem(data) {
  try {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URL);

    if (await isAdmin()) {
      // Validate data
      const validatedData = menuItemSchema.parse(data);

      const { _id } = data;

      const menuItem = await MenuItem.findById(_id);

      if (menuItem && menuItem.image) {
        // Extract public_id from the old image URL
        const public_id = menuItem.image.split("/").pop().split(".")[0];

        // Delete the old image from Cloudinary
        await new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(public_id, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          });
        });
      }

      // Update menu item
      const menuItemDoc = await MenuItem.findByIdAndUpdate(_id, data);

      return menuItemDoc;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract error messages
      const errorMessages = error.errors.map((err) => err.message);
      throw new Error(`Invalid data: ${errorMessages.join(", ")}`);
    } else {
      // If it's not a ZodError, rethrow it
      throw error;
    }
  }
}

export async function deleteMenuItem(_id) {
  try {
    mongoose.connect(process.env.MONGO_URL);

    if (await isAdmin()) {
      // Fetch the menu item
      const menuItem = await MenuItem.findOne({ _id });
      if (menuItem && menuItem.image) {
        // Extract public_id from the image URL
        const public_id = menuItem.image.split("/").pop().split(".")[0];

        // Delete the image from Cloudinary
        await new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(public_id, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          });
        });
      }

      // Delete the menu item from the database
      const result = await MenuItem.deleteOne({ _id });

      return result;
    }
  } catch (error) {
    throw error;
  }
}

export async function createTodaysCounter(data) {
  try {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URL);

    if (await isAdmin()) {
      // Validate data
      const validatedData = todaysCounterSchema.parse(data);

      const docAmount = await TodaysCounter.countDocuments();

      let todaysCounterDoc;

      if (docAmount === 0) {
        todaysCounterDoc = await TodaysCounter.create(data);
      } else {
        const doc = await TodaysCounter.findOne();

        if (doc && doc.image) {
          const { _id } = doc;

          todaysCounterDoc = await TodaysCounter.findOneAndReplace(
            { _id },
            data
          );

          // Extract public_id from the old image URL
          const public_id = doc.image.split("/").pop().split(".")[0];

          // Delete the old image from Cloudinary
          await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(public_id, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            });
          });
        }
      }

      return todaysCounterDoc;
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Extract error messages
      const errorMessages = error.errors.map((err) => err.message);
      throw new Error(`Invalid data: ${errorMessages.join(", ")}`);
    } else {
      // If it's not a ZodError, rethrow it
      console.log(error);
      throw error;
    }
  }
}
