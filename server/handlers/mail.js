const sgMail = require('@sendgrid/mail');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../templates/${filename}.pug`, options);
  const inlined = juice(html);
  return inlined;
};

exports.send = (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText.fromString(html);

  const mailOptions = {
    to: options.email,    
    from: `Wealth Watch <noreply@wealthwatch.com>`,
    subject: options.subject,
    text,
    html,
  };
  sgMail.send(mailOptions);
};

