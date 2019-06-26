const nodemailer = require('nodemailer');
const { config } = require('../config');

exports.send = ({ message, name, email }) => new Promise(async (resolve, reject) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    let info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: config.adminEmail,
      subject: 'Contact made',
      text: message
    });

    console.log('Message sent:', info.messageId);

    resolve();
  } catch (error) {
    reject(error);
  }
});

exports.submitContact = async (req, res) => {
  try {
    await exports.send({ ...req.body });
    req.flash('message', 'Your message was sent');
    res.redirect('/');
  } catch (error) {
    console.error(error);
  }
};
