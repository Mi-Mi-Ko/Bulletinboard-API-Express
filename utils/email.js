'use strict';

const nodeMailer = require('nodemailer');
const config = require('../config/env.json');

/**
 * @param {Object} params
 * @return {Object}
 */
class Email {
  static async send(userEmail, subject, text) {
    var errorMessage = "";
    // create reusable transporter object using the default SMTP transport
    var transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.Email.email,
        pass: config.Email.password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: config.Email.email,
      to: userEmail,
      subject: subject,
      text: text,
      html: '<b>Welcome to Bulletin Board!</b>'
    };
     return await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, hash) => {
        if (!error) {
          resolve(hash);
        }
        reject(error);
      });
    })
  }
}
module.exports = Email;
