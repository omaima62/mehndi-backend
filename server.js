// 🔹 Required Packages
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

// 🔹 App Setup
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// 🔹 Contact Form Endpoint
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    console.log("📩 Incoming data:", { name, email, message });

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "omaimamujeebakbar@gmail.com",
                pass: "zouctqbuhqiaftrv", // ⚠️ no spaces
            },
        });

        console.log("🔌 Verifying transporter...");
        await transporter.verify();
        console.log("✅ Transporter verified");

        const mailOptions = {
            from: `"Mehndi Website" <omaimamujeebakbar@gmail.com>`,
            to: "omaimamujeebakbar@gmail.com",
            replyTo: email,
            subject: "New Message from Mehndi Website",
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        };

        console.log("📨 Sending mail...");
        await transporter.sendMail(mailOptions);
        console.log("✅ Mail sent successfully");

        res.status(200).send("Message sent successfully");

    } catch (error) {
        console.error("❌ MAIL ERROR FULL DETAILS 👇");
        console.error(error);
        res.status(500).send("Message not sent");
    }
});

// 🔹 Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
