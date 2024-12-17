import AWS from "aws-sdk";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.CLOUDFLARE_ACCOUNT_ID);
console.log(process.env.CLOUDFLARE_ACCESS_KEY_ID);
console.log(process.env.CLOUDFLARE_SECRET_ACCESS_KEY);

// Configure AWS SDK with Cloudflare R2 credentials
export const s3 = new AWS.S3({
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`, // Cloudflare R2 endpoint
  region: "auto", // R2 doesn't require a specific region, 'auto' works
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID, // Your R2 access key ID
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY, // Your R2 secret access key
  },
  signatureVersion: "v4", // Use AWS v4 signature
});

// Multer configuration to upload to Cloudflare R2
const storage = multer.memoryStorage(); // We use memory storage, as the file is directly uploaded to R2

export const upload = multer({ storage: storage });
