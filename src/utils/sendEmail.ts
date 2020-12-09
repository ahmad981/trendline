import * as nodemailer from 'nodemailer';
import { SMTP } from '../config';

import { verificationEmail } from './email-templates';

const transporter = nodemailer.createTransport(SMTP.testing);

export const sendEmailVerification = (name, verificationLink, subject, emailTo) => {

  const html = verificationEmail(name, verificationLink);
  const mailOptions = {
    from: 'trendline',
    to: emailTo,
    subject,
    html,
  };
  if (process.env.NODE_ENV === 'testing') {
    console.log('Email sent ....', 'test mode ');
    return;
  }
  transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log('Email sending error', error);
    } else {
      console.log(`Email sent: ${  info.response}`);
    }
  });

};

export const sendApplicationConfirmationEmail = (email: string, content: string) => {
  return { email, content };
};


