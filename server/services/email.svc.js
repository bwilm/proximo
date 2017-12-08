"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
//remember to change the key once you deploy to AWS!
const sg = sendgrid(process.env.SENDGRID_API_KEY || '');
function sendEmail(to, from, subject, message) {
    let toEmail = new helper.Email(to);
    let fromEmail = new helper.Email(from);
    let emailContent = new helper.Content('text/html', message);
    let mail = new helper.Mail(fromEmail, subject, toEmail, emailContent);
    let request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });
    return sg.API(request);
}
exports.sendEmail = sendEmail;
