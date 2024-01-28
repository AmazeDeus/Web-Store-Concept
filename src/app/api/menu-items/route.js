import { v2 as cloudinary } from "cloudinary";
import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";
import {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../utils/dataAccessLayer.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const data = await req.json();
  try {
    const menuItemDoc = await createMenuItem(data);
    return Response.json(menuItemDoc);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}

export async function PUT(req) {
  try {
    const { ...data } = await req.json();
    const menuItemDoc = await updateMenuItem(data);
    return Response.json(menuItemDoc);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await MenuItem.find());
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  try {
    const menuItemDoc = await deleteMenuItem(_id);
    return Response.json(menuItemDoc);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "An error occurred during deletion." });
  }
}
