// server.js
// This file is the starting point for your Node.js application

// Importing required modules
const express = require('express'); // Express framework for building the web server
const morgan = require('morgan'); // Middleware for logging requests
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const nodemailer = require('nodemailer'); // Module for sending emails

// Initialize the Express application
const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(morgan('dev')); // Log requests to the console in development format

// Array to store pending requests
let pendingRequests = [];

// Routes for the application
app.post('/send-letter', (req, res) => {
  const { username, address, requestText } = req.body; // Destructure request body for easier access

  // Simple validation to ensure all required fields are present
  if (!username || !address || !requestText) {
    return res.status(400).json({ error: 'Missing data' }); // Return a 400 response if validation fails
  }

  // Add the request to the pending requests list
  pendingRequests.push({ username, address, requestText });

  res.status(200).send('Request received'); // Send a success response
});

// Create a transporter for Nodemailer using Ethereal email service
let transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email', // SMTP server hostname
  port: 587, // SMTP server port
  auth: {
    user: 'magdalena.gusikowski@ethereal.email', // Ethereal email username
    pass: 'zWKpKEAHbumYbSeZNF' // Ethereal email password
  }
});

// Function to send pending requests via email
function sendPendingRequests() {
  if (pendingRequests.length === 0) {
    console.log('No pending requests.'); // Log if there are no pending requests
    return; // Exit the function if there are no requests
  }

  // Create the body of the email
  let emailBody = 'Pending requests:\n\n'; // Initialize the email body
  pendingRequests.forEach((request, index) => {
    emailBody += `Request ${index + 1}:\n`; // Add request number
    emailBody += `Username: ${request.username}\n`; // Add username
    emailBody += `Address: ${request.address}\n`; // Add address
    emailBody += `Request Text: ${request.requestText}\n\n`; // Add request text
  });

  // Email options
  let mailOptions = {
    from: 'do_not_reply@northpole.com', // Sender email address
    to: 'santa@northpole.com', // Recipient email address
    subject: 'Pending requests', // Subject line of the email
    text: emailBody // Body content of the email
  };

  // Send the email using the transporter
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error sending email: ', error); // Log error if sending fails
    }
    console.log('Email sent: ', info.messageId); // Log the message ID of the sent email
    console.log('Preview URL: ', nodemailer.getTestMessageUrl(info)); // Log the preview URL for the sent email

    // Clear the pending requests once the email has been sent
    pendingRequests = [];
  });
}

// Execute the function to send pending requests every 15 seconds
setInterval(sendPendingRequests, 15000);

// Start listening for requests
const listener = app.listen(process.env.PORT || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port); // Log the port the app is listening on
});
