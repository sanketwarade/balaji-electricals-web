const sgMail = require('./email');

const sendquoteFormEmails = async (userEmail, adminEmail, userDetails) => {
  const { name, company, contact, machines, message } = userDetails;

  const userMail = {
    from: process.env.SENDGRID_SENDER_EMAIL,
    to: userEmail,
    subject: 'Quote Request Received',
    text: `Hello ${name},\n\nThank you for requesting a quote. Here are the details we received:\n\nMachines/Parts: ${machines}\nMessage: ${message}\n\nWe will get back to you shortly.`,
  };

  const adminMail = {
    from: process.env.SENDGRID_SENDER_EMAIL,
    to: adminEmail,
    subject: 'New Quote Request',
    text: `New quote request received:\n\nName: ${name}\nCompany: ${company}\nContact: ${contact}\nMachines/Parts: ${machines}\nMessage: ${message}`,
  };

  // Send emails asynchronously
  await Promise.all([sgMail.send(userMail), sgMail.send(adminMail)]);
};

module.exports = sendquoteFormEmails;
