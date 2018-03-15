const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

const config = require('./config/nodemailer');

// View engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact', {display: 'display: none;'});
});

app.post('/send', (req, res) => {

  if(!req.body.name || !req.body.email || !req.body.subject || !req.body.message || !req.body.phone){
    res.render('contact', {msg: 'Error. All fields are required.', display: 'display: block;', alertClass: 'alert alert-danger'});

    return;
  }

  const output = `
    <p>You have a new message from Nodemailer.</p>
    <h3>Contact details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: `${config.host}`,
        port: 587, // default not secure smtp port, use 465 for SSL
        secure: false, // True for 465, false for other ports
        auth: {
            user: `${config.smtpEmail}`,
            pass: `${config.smtpPassword}`
        },
        tls: {
          rejectUnauthorized: false
        }
    });

    // Setup email data with unicode symbols
    let mailOptions = {
      from: `"Nodemailer Contact" <${config.smtpEmail}>`, // Sender address
        to: `${config.receivers}`, // List of receivers
        subject: 'Some subject..', // Subject line
        text: 'Hello World?', // Plain text body
        html: output // HTML body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        res.render('contact', { msg:'Email has been sent!', display:'display: block;', alertClass: 'alert alert-success' });
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000...');
});
