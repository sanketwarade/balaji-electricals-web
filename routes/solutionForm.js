const express = require('express');
const { validationResult } = require('express-validator');
const validator = require('validator');
const pool = require('../config/db');
const solutionFormValidator = require('../middlewares/solutionformValidator');
const sendsolutionFormEmails = require('../utils/solutionFormEmail');

const router = express.Router();

router.post('/submit-solutionForm', solutionFormValidator, async (req, res) => {
  console.log("Form Data:", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation Errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { formType, name, email, phone, 'machine-type': machineType, description } = req.body;

  // Sanitize Inputs
  const sanitizedInputs = {
    name: validator.escape(name),
    email: validator.escape(email),
    phone: validator.escape(phone),
    machineType: validator.escape(machineType),
    description: validator.escape(description),
  };

  const query = `INSERT INTO custom_solutions (form_type, name, email, phone, machine_type, description) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    formType,
    sanitizedInputs.name,
    sanitizedInputs.email,
    sanitizedInputs.phone,
    sanitizedInputs.machineType,
    sanitizedInputs.description,
  ];

  try {
    const [result] = await pool.execute(query, values);
    console.log('Data inserted into database:', result);

    // Send emails
    await sendsolutionFormEmails(email, process.env.ADMIN_EMAIL, {
      name: sanitizedInputs.name,
      phone: sanitizedInputs.phone,
      machineType: sanitizedInputs.machineType,
      description: sanitizedInputs.description,
    });

    res.status(200).send('Form submitted successfully!');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
