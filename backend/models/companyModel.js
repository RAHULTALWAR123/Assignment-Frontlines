import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
    enum: [
      "Software","Technology","Healthcare","Finance","Education","Manufacturing",
      "Retail","Hospitality","Transportation","Energy","Real Estate","Other"
    ]
  },
  location: {
    city: String,
    state: String,
    country: String
  },
  size: {
    employees: Number,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
}, { timestamps: true });

const company = mongoose.model("Company",companySchema);
export default company;
