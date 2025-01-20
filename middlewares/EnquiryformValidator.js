const { body } = require("express-validator");

const EnquiryformValidator = [
  body("name").trim().escape().isLength({ min: 2, max: 50 }),
  body("email").isEmail().normalizeEmail(),
  body("phone").isMobilePhone("en-IN"),
  body("subject").trim().escape().isLength({ min: 10, max: 200 }),
];

module.exports = EnquiryformValidator;
