import Form from "@/models/Form";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI || "", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { id } = req.query;

  try {
    switch (req.method) {
      case "GET":
        // Get a form by ID
        if (!id || typeof id !== "string") {
          return res.status(400).json({ error: "ID is required" });
        }
        const form = await Form.findById(id);
        if (!form) {
          return res.status(404).json({ error: "Form not found" });
        }
        return res.status(200).json(form);

      case "PUT":
        // Update a form by ID
        if (!id || typeof id !== "string") {
          return res.status(400).json({ error: "ID is required" });
        }
        const updatedForm = await Form.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedForm) {
          return res.status(404).json({ error: "Form not found" });
        }
        return res.status(200).json(updatedForm);

      case "DELETE":
        // Delete a form by ID
        if (!id || typeof id !== "string") {
          return res.status(400).json({ error: "ID is required" });
        }
        const deletedForm = await Form.findByIdAndDelete(id);
        if (!deletedForm) {
          return res.status(404).json({ error: "Form not found" });
        }
        return res.status(200).json({ message: "Form deleted successfully" });

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res
          .status(405)
          .json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
