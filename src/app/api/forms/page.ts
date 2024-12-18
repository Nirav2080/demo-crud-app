import Form from "@/models/Form";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
const connectToDatabase = async ()=>{
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || "", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  try {
    switch (req.method) {
      case "GET":
        // Get all forms
        const forms = await Form.find();
        return res.status(200).json(forms);

      case "POST":
        // Create a new form
        const newForm = new Form(req.body);
        await newForm.save();
        return res.status(201).json(newForm);

      default:
        res.setHeader("Allow", ["GET", "POST"]);
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