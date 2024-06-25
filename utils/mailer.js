const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yogaulilulul@gmail.com',
    pass: 'okci jrvy nloz xpsw',
  },
});

const renderTemplate = (name, data) => {
    const filePath = path.join(__dirname, '../template', `${name}`);
    const source = fs.readFileSync(filePath, 'utf8');
    const template = handlebars.compile(source);
    return template(data);
}

const sendMail = (to, subject, templateName, data) => {
  const html = renderTemplate(templateName, data);
  const mailOptions = {
    to: to,
    subject: subject,
    html
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
