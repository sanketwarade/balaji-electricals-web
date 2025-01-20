const express = require("express");
const { validationResult } = require("express-validator");
const validator = require("validator");
const pool = require("../config/db");
const EnquiryformValidator = require("../middlewares/EnquiryformValidator");
const sendEnquiryformEmails = require("../utils/EnquiryformEmail");

const router = express.Router();

router.post("/submit-Enquiryform", EnquiryformValidator, async (req, res) => {
  console.log("Received Data:", req.body);
  const { formType, name, email, phone, subject } = req.body;

  // Validate the inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  // Sanitize Inputs
  const sanitizedInputs = {
    name: validator.escape(name),
    email: validator.escape(email),
    phone: validator.escape(phone),
    subject: validator.escape(subject),
  };

  // Save data to MySQL
  const query =
    "INSERT INTO enquiries (form_type, name, email, phone, subject) VALUES (?, ?, ?, ?, ?)";
  const values = [
    formType,
    sanitizedInputs.name,
    sanitizedInputs.email,
    sanitizedInputs.phone,
    sanitizedInputs.subject,
  ];

  try {
    const [result] = await pool.execute(query, values);
    console.log("Data inserted into database:", result);

    // Send emails
    await sendEnquiryformEmails(
      sanitizedInputs.email,
      process.env.ADMIN_EMAIL,
      sanitizedInputs
    );

    return res.status(200).end(); // No message in response
} catch (error) {
  console.error("Error inserting data into database:", error);
  return res
    .status(500)
    .send("Internal server error. Could not submit enquiry.");
}
});

module.exports = router;
