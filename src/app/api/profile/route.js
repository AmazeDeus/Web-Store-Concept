import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { updateUser } from "../utils/dataAccessLayer";

export async function PUT(req) {
  try {
    const data = await req.json();
    await updateUser(data);
    return Response.json(true);
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 400,
    });
  }
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");

  let filterUser = {};
  if (_id) {
    filterUser = { _id };
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filterUser = { email };
  }
  const user = await User.findOne(filterUser).lean();
  const userInfo = await UserInfo.findOne({ email: user.email }).lean();

  return Response.json({ ...userInfo, ...user });
}
