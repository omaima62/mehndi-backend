const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Contact route
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    console.log("📩 Incoming contact form data:", { name, email, message });

    if (!name || !email || !message) {
        return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    try {
        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "omaimamujeebakbar@gmail.com",
                pass: "gaavmyifzjczbfky", // App Password
            },
        });

        await transporter.verify(); // Ensure connection is OK
        console.log("✅ Mail server verified");

        const mailOptions = {
            from: `"Mehndi Website" <omaimamujeebakbar@gmail.com>`,
            to: "omaimamujeebakbar@gmail.com",
            replyTo: email,
            subject: "New Message from Mehndi Website",
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
            html: `<h3>New Message from Mehndi Website</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong><br>${message}</p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("✉️ Message sent successfully");
        res.status(200).json({ status: "success", message: "Message sent successfully" });
    } catch (error) {
        console.error("❌ Error sending message:", error);
        res.status(500).json({ status: "error", message: "Message not sent" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
