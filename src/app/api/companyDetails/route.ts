import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { default as CompanyForm } from "../../../models/Form";


export async function POST(req: NextRequest) {
  const { name, companyWebsite, accountOwner, employees, linkedin, address } =
    await req.json();

  if (
    !name ||
    !companyWebsite ||
    !accountOwner ||
    !employees ||
    !linkedin ||
    !address
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();
    // Check for duplicates in each field
    const duplicateName = await CompanyForm.findOne({ name });
    if (duplicateName) {
      return NextResponse.json(
        {
          message: "A company with this name already exists",
          field: "name",
        },
        { status: 400 }
      );
    }

    const duplicateWebsite = await CompanyForm.findOne({ companyWebsite });
    if (duplicateWebsite) {
      return NextResponse.json(
        {
          message: "A company with this website already exists",
          field: "companyWebsite",
        },
        { status: 400 }
      );
    }

    const duplicateLinkedIn = await CompanyForm.findOne({ linkedin });
    if (duplicateLinkedIn) {
      return NextResponse.json(
        {
          message: "A company with this LinkedIn profile already exists",
          field: "linkedin",
        },
        { status: 400 }
      );
    }

    const newCompany = new CompanyForm({
      name,
      companyWebsite,
      accountOwner,
      employees,
      linkedin,
      address,
    });
    await newCompany.save();
    return NextResponse.json(
      { message: "Company created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error creating company" }, { status: 500 });
  }
}
