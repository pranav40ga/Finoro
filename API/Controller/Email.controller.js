import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "mySuperSecret123"; 

function sendMail(email) {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });

  const verificationLink = `http://localhost:3000/user/verify/${encodeURIComponent(token)}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pranavchalisgaonkar077@gmail.com', 
      pass: 'fwtv fxgg sjsa fkbt' 
    }
  });

  const mailOptions = {
    from: 'your@gmail.com',
    to: email,
    subject: 'Welcome to Finoro ',
    html: `
      <h1>Welcome to Finoro</h1>
      <p>

We’re thrilled to have you join Finoro — a powerful and intuitive stock screening and analysis platform built with Indian investors in mind. Whether you’re a seasoned trader or just beginning your journey into the world of investing, Finoro is here to guide you with smart tools, insightful data, and a seamless user experience.

Our mission is simple: to empower every investor with the knowledge and technology needed to make confident, well-informed decisions. At Finoro, you’ll find everything from in-depth financial metrics and fundamental data to customizable screeners and real-time company insights. With our growing database of Indian and global stocks, we help you uncover opportunities others may miss.

But Finoro is more than just a tool — it’s a community. A space where data meets intuition, where investors can explore, learn, and grow together. As part of our family, you’ll always stay ahead of market trends and make choices that align with your goals.

Thank you for trusting Finoro to be your companion in the investment world. We’re excited to support you every step of the way. Let’s build wealth, one smart decision at a time.

Welcome aboard — your journey starts now!.</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("❌ Mail send error:", error.message);
    } else {
      console.log("📧 Email sent:", info.response);
    }
  });

  console.log("🔐 JWT Token:", token);
}

export default sendMail;



// import nodemailer from 'nodemailer';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();
// const JWT_SECRET = "mySuperSecret123"; // move this to .env

// function sendMail(email) {
//   // Create a verification token
//   const token = jwt.sign({ email }, JWT_SECRET);

//   const verificationLink = `http://localhost:3000/user/verify/${encodeURIComponent(token)}`;

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'pranavchalisgaonkar077@gmail.com',
//       pass: 'fwtv fxgg sjsa fkbt'
//     }
//   });

//   const mailOptions = {
//     from: 'pranavchalisgaonkar077@gmail.com',
//     to: email,
//     subject: 'Verify your Finoro account',
//     html: `
//       <h1>Welcome to Finoro</h1>
//       <p>Click the link below to verify your account:</p>
//       <a href="${verificationLink}">${verificationLink}</a>
//       <p>This link will expire in 1 hour.</p>
//     `
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log("Mail error:", error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
//   console.log(token);
// }
// export default sendMail;
