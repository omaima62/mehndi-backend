const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

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
                pass: "gaavmyifzjczbfky", // App Password
            },
        });

        await transporter.verify();

        const mailOptions = {
            from: `"Mehndi Website" <omaimamujeebakbar@gmail.com>`,
            to: "omaimamujeebakbar@gmail.com",
            replyTo: email,
            subject: "New Message from Mehndi Website",
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send("Message sent successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Message not sent");
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
