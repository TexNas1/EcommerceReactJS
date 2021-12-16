import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb+srv://TexNAS:SignPass365@clusterec.urhsv.mongodb.net/ClusterEC?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "sb",
};
