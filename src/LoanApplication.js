import mongoose from "mongoose";

const GuarantorSchema = new mongoose.Schema({
  name: String,
  panNumber: { type: String, match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/ },
  relationship: { type: String, enum: ["Father", "Mother", "Brother", "Sister", "Spouse", "Other"] },
  relation: { type: String },
});

const DirectorSchema = new mongoose.Schema({
  name: String,
  panNumber: { type: String, match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/ },
  tags: [String],
});

const LoanApplicationSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  gstin: { type: String, match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/ },
  directors: [DirectorSchema],
  creditScore: { type: Number, required: true },
  requiredLoanAmount: { type: Number, min: 50000, max: 500000 },
  guarantors: { type: [GuarantorSchema], required: function () { return this.creditScore < 700; } },
  bankStatements: { type: [String], required: function () { return this.creditScore < 700; } },
});

export const LoanApplicationModel = mongoose.model("LoanApplication", LoanApplicationSchema);
