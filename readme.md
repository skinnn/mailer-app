## Node.js app for sending emails

## How to start

1. Clone or download the repo
2. Run ` npm install ` in the root folder - **mailer-app**
3. In **mailer-app/config/nodemailer.js** file:
   - add email and password for the SMTP Server (e.g. for Google SMTP Server add your google email and password..)
   - add recipient's email address (you can add multiple recipients separated with comma - ` "eg@eg.com,eg1@eg1.com" `)
4. Run ` node app ` in root folder to start the app on port 4000
