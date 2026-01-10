import mongoose from "mongoose";
export const db = async () => {
  try {
    const connect = mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to db`);
  } catch (error) {
    console.log("Error in connecting to mongodb", error.message);
  }
};
