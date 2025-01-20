const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEnquiryformEmails = async (userEmail, adminEmail, details) => {
  const userMail = {
    from: process.env.SENDGRID_SENDER_EMAIL,
    to: userEmail,
    subject: "Thank you for your enquiry!",
    text: `Dear ${details.name},\n\nThank you for reaching out to BALAJI ELECTRICALS. We will get back to you soon.\n\nBest regards,\nBALAJI ELECTRICALS`,
  };

  const adminMail = {
    from: process.env.SENDGRID_SENDER_EMAIL,
    to: adminEmail,
    subject: "New Enquiry Received",
    text: `New enquiry from ${details.name}.\n\nDetails:\nName: ${details.name}\nEmail: ${details.email}\nPhone: ${details.phone}\nSubject: ${details.subject}`,
  };

  await Promise.all([sgMail.send(userMail), sgMail.send(adminMail)]);
};

module.exports = sendEnquiryformEmails;
