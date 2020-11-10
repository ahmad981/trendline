import * as nodemailer from 'nodemailer';
import { SMTP } from '../config';
const transporter = nodemailer.createTransport(SMTP.testing);

import { verificationEmail } from './email-templates';
export const sendEmailVerification = (name, verificationLink, subject, emailTo) => {
    console.log('Email config ', SMTP.testing);
    let html = verificationEmail(name, verificationLink);
    var mailOptions = {
        from: "trendline",
        to: emailTo,
        subject: subject,
        html: html
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log("Email sending error", error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
