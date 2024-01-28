import mongoose from "mongoose";
import { createTodaysCounter } from "../utils/dataAccessLayer.js";
import { TodaysCounter } from "@/models/TodaysCounter";

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await TodaysCounter.find());
}

export async function PUT(req) {
  const data = await req.json();
  console.log("DATA:", data);
  try {
    const todaysCounterDoc = await createTodaysCounter(data);
    return Response.json(todaysCounterDoc);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
