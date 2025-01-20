const { body } = require('express-validator');

const solutionFormValidator = [
  body('name').trim().escape().isLength({ min: 3, max: 50 }),
  body('email').isEmail().normalizeEmail(),
  body('phone').isLength({ min: 10, max: 10 }).isNumeric().trim(),
  body('description').isLength({ min: 10, max: 100 }).trim(),
  body('machine-type').isLength({ min: 3, max: 50 }).trim(),
];

module.exports = solutionFormValidator;
