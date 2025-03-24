import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  role: {type: String, required: true},
  authorizedSignatory: {type: Boolean, default: false}
});

const directorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  panNo: { 
    type: String, 
    required: true, 
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // ✅ PAN format validation
  },
  tags: [tagSchema],
});

const guarantorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  panNo: { 
    type: String, 
    required: true,
    match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // ✅ PAN format validation
  },
  relation: { type: String, enum:['Father', 'Mother', 'Brother','Sister','Spouse'], required: true },
});

const loanSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  gstin: { 
    type: String, 
    required: true,
    match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, // ✅ GSTIN format validation
  },
  directors: [directorSchema],
  creditScore: { type: String, required: true },
  loanAmount: { type: String, required: true },
  guarantors: { type: [guarantorSchema], default: [] },
  bankStatements: [{ type: String }], // ✅ Multiple bank statements allowed
});

// ✅ Ensure at least 2 guarantors if creditScore < 700
loanSchema.pre("validate", function (next) {
  if (this.creditScore < 700 && this.guarantors.length < 2) {
    return next(new Error("At least 2 guarantors are required if credit score is below 700."));
  }
  next();
});

export default mongoose.model("Loan", loanSchema);
