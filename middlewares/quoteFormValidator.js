const { body } = require('express-validator');

const quoteFormValidator = [
  body('name').trim().escape().isLength({ min: 3, max: 50 }),
  body('email').isEmail().normalizeEmail(),
  body('contact').isLength({ min: 10, max: 10 }).isNumeric().trim(),
  body('message').trim().escape().isLength({ min: 10, max: 100 }),
  body('company').trim().escape().isLength({ min: 3, max: 50 }),
  body('machines')
    .trim()
    .escape()
    .isIn([
      'MIG Welding Machine',
      'TIG Welding Machine',
      'SPM Welding Machine',
      'Rotary Positioner',
      'X-Y Linear Slides',
      'Spare Parts',
      'Control Panels',
    ])
    .withMessage('Invalid machine selection.'),
];

module.exports = quoteFormValidator;
