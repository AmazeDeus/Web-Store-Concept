import { createUser } from "../utils/dataAccessLayer.js";

export async function POST(req) {
  const data = await req.json();
  try {
    const userDoc = await createUser(data);
    return Response.json(userDoc);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
