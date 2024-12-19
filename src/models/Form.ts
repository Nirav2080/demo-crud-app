import mongoose, { Model, Schema } from "mongoose";

interface CompanyFormData extends Document {
  name: string;
  id: string;
  companyWebsite: string;
  accountOwner: string;
  employees: number;
  linkedin: string;
  address: string;
}

const CompanyFormSchema: Schema<CompanyFormData> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    companyWebsite: {
      type: String,
      required: [true, "Company Website is required"],
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

const CompanyForm: Model<CompanyFormData> =
  mongoose.models.CompanyForm ||
  mongoose.model<CompanyFormData>("CompanyForm", CompanyFormSchema);

export default CompanyForm;
