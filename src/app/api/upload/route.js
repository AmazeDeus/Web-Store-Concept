import { v2 as cloudinary } from "cloudinary";
import uniqid from "uniqid";

// Configuring Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const data = await req.formData();

  // Check if the file is present in the request
  if (data.get("file")) {
    // Extracting the file from the request
    const file = data.get("file");

    // Generate a unique file name using uniqid
    const newFileName = uniqid();

    // Reading the file stream and storing it in a buffer
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    try {
      // Uploading the file to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            public_id: newFileName,
            // Applying transformation to resize and crop the image
            // Extracting width and height from the request
            transformation: [
              {
                width: parseInt(data.get("width"), 10),
                height: parseInt(data.get("height"), 10),
                crop: "fill",
                gravity: "auto",
              },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(buffer);
      });

      // Returning the URL of the uploaded file
      const link = result.secure_url;
      return Response.json(link);
    } catch (error) {
      // Handling any errors during the file upload process
      console.error(error);
      return Response.json({ error: "An error occurred during file upload." });
    }
  }

  // Return true if no file is present in the request
  return Response.json(true);
}
