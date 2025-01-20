const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendsolutionformEmails = async (userEmail, adminEmail, formData) => {
  const { name, phone, machineType, description } = formData;

  const userMail = {
    from: process.env.SENDGRID_SENDER_EMAIL,
    to: userEmail,
    subject: 'Custom Solution Request Received',
    text: `Hello ${name},\n\nThank you for requesting a custom solution.\nWe will get back to you shortly.`,
  };

  const adminMail = {
    from: process.env.SENDGRID_SENDER_EMAIL,
    to: adminEmail,
    subject: 'New Custom Solution Request',
    text: `New Custom Solution request received:\n\nName: ${name}\nDescription: ${description}\nPhone: ${phone}\nEmail: ${userEmail}\nMachine Type: ${machineType || 'N/A'}`,
  };

  // Send both emails asynchronously
  await sgMail.send(userMail);
  await sgMail.send(adminMail);
};

module.exports = sendsolutionformEmails;
