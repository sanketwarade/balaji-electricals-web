const express = require('express');
const { validationResult } = require('express-validator');
const validator = require('validator');
const pool = require('../config/db');
const quoteFormValidator = require('../middlewares/quoteFormValidator');
const sendquoteFormEmails = require('../utils/quoteFormemail');



const router = express.Router();

router.post('/submit-quoteForm', quoteFormValidator, async (req, res) => {
  console.log("FormData:", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation Errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { formType, name, company, contact, email, machines, message } = req.body;

  // Sanitize Inputs
  const sanitizedInputs = {
    name: validator.escape(name),
    email: validator.escape(email),
    contact: validator.escape(contact),
    message: validator.escape(message),
    company: validator.escape(company),
  };

  // Save data to MySQL
  const query = 'INSERT INTO quote_requests (form_type, name, company, contact, email, machines, message) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [
    formType,
    sanitizedInputs.name,
    sanitizedInputs.company,
    sanitizedInputs.contact,
    sanitizedInputs.email,
    JSON.stringify(machines),
    sanitizedInputs.message,
  ];

  try {
    const [result] = await pool.execute(query, values);
    console.log('Data inserted into database:', result);

    // Send emails
    await sendquoteFormEmails(email, process.env.ADMIN_EMAIL, {
      name: sanitizedInputs.name,
      company: sanitizedInputs.company,
      contact: sanitizedInputs.contact,
      machines,
      message: sanitizedInputs.message,
    });

    return res.status(200).end();  // No message sent in the response
  } catch (error) {
    console.error("Error inserting data into database:", error);
    return res.status(500).send("Internal server error. Could not submit quote request.");
  }
});

module.exports = router;
