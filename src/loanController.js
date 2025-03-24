import { LoanApplicationModel } from "./LoanApplication.js";

import { validateSchema }  from "./validate.js";

// Apply for Loan
export const applyForLoan = async (req, res) => {
  const formData = req.body;
  const files = req.files;

  // Validate data using AJV
  const validationResult = validateSchema(formData);
  if (!validationResult.valid) {
    return res.status(400).json({ error: validationResult.errors });
  }

  // Store file metadata
  // formData.bankStatements = files.map((file) => file.originalname);

  try {
    const loanApplication = new LoanApplicationModel(formData);
    await loanApplication.save();
    res.status(201).json({ message: "Loan application submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Database Error", details: err.message });
  }
};

// Get all loan applications
export const getAllLoans = async (req, res) => {
  try {
    const loans = await LoanApplicationModel.find();
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ error: "Database Error", details: err.message });
  }
};
