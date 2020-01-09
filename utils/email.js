'use strict';

const nodeMailer = require('nodemailer');
const config = require('../config/env.json');

/**
 * @param {Object} params
 * @return {Object}
 */
module.exports.send = (userEmail,subject,text) => {
	let transporter = nodeMailer.createTransport({
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
    let mailOptions = {
        from: config.Email.email,
        to: userEmail,
        subject: subject,
        text: text,
        html: '<b>Welcome to Bulletin Board!</b>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.render('index');
    });
};
