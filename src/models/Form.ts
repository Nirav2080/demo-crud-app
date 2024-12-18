import mongoose, { Model, Schema } from "mongoose";

interface IForm extends Document {
  name: string;
  id: string;
  domainName: string;
  accountOwner: string;
  employees: number;
  linkedin: string;
  address: string;
}

const FormSchema: Schema<IForm> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    domainName: {
      type: String,
      required: [true, "DomainName is required"],
      unique: true,
      trim: true,
    },
    accountOwner: {
      type: String,
      required: [true, "AccountOwner is required"],
    },
    employees: {
      type: Number,
      required: [true, "Employees is required"],
    },
    linkedin: {
      type: String,
      required: [true, "Linkedin is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const From: Model<IForm> =
  mongoose.models.From ||
  mongoose.model<IForm>("Form", FormSchema);

export default From;
