import mongoose, { Schema } from "mongoose";

const url = process.env.MONGODB_URI as string;

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(url);
    console.log("Mongo connection successfully established");
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;
