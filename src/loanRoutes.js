import express from 'express';

import { applyForLoan, getAllLoans } from "./loanController.js";
import { upload } from "./upload.js";

const router = express.Router();

router.post("/apply", upload.array("bankStatements"), applyForLoan);
router.get("/", getAllLoans);

export default router;
