"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailVerification = void 0;
const nodemailer = require("nodemailer");
const config_1 = require("../config");
const email_templates_1 = require("./email-templates");
const transporter = nodemailer.createTransport(config_1.SMTP.testing);
exports.sendEmailVerification = (name, verificationLink, subject, emailTo) => {
    const html = email_templates_1.verificationEmail(name, verificationLink);
    const mailOptions = {
        from: 'trendline',
        to: emailTo,
        subject,
        html,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Email sending error', error);
        }
        else {
            console.log(`Email sent: ${info.response}`);
        }
    });
};
