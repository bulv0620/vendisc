const nodemailer = require('nodemailer');
const config = require('../config/constant.json');

let transporter = nodemailer.createTransport({
    service: config.MAIL_SERVICE,
    port: config.MAIL_PORT,
    secureConnection: true,
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASSWORD,
    }
});

function createOption(to, pwd) {
    return {
        from: '"Netdisc" <bulv0620@163.com>',
        to: to,
        subject: 'Netdisc Temporary Password',
        html: `
            <div style="background: #1A5CFF; padding-left: 18px; height: 54px; line-height: 54px">
                <h1><font color="#fff">Netdisc</font></h1>
            </div>
            <div style="padding: 18px">
                <p>
                    Your password has been reset, and the temporary password is:
                    <h1>${pwd}</h1>
                </p>
                <p>Please modify it immediately after logging in.</p>
                <p><font color="#18191c">Any questions, please send email to:</font><a href="mailto:bulv0620@163.com">bulv0620@163.com</a></p>
            </div>
        `
    };
}

function sendMail(to, pwd) {
    return new Promise((resolve, reject) => {
        const mailOption = createOption(to, pwd);
        transporter.sendMail(mailOption, (err, info) => {
            if(err) {
                reject(err);
            }
            resolve(info);
        })
    })
}

module.exports = {sendMail}