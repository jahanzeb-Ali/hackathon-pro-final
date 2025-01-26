import { Router } from "express";
import nodemailer from  "nodemailer";
import User from "../modals/User.js";
const app = Router();
app.post("/register", async (req, res) => {
  const { cnic, email, name} = req.body;
  const tempPassword = Math.random().toString(36).substring(7)
  try {
    // Hash the password
    const newUser = new User({
      cnic,
      email,
      name,
      password : tempPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" ,data: newUser});
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Error registering user", error });
  }
  sendEmail(email, tempPassword)
});

  async function sendEmail(email, tempPassword) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'idfortable@gmail.com',
            pass: 'acmy dqer dyed nzge',
        },
    });

    const mailOptions = {
        from: 'idfortable@gmail.com',
        to: email,
        subject: 'Your Temporary Password',
        text: `Your temporary password is: ${tempPassword}. Please log in and change your password immediately.`,
        html: `<p>Your temporary password is: <strong>${tempPassword}</strong>. Please log in and change your password immediately.</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
    }

}

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

app.post('/change-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        await User.updateOne({ email }, { password: newPassword });
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating password', error });
    }
});


export default app;