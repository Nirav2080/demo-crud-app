import mongoose from "mongoose";

let isConnected = false;

const connectDB = async (): Promise<void> => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connection.readyState === 1;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
