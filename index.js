// imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

// const
const PORT = 5050;
const MAIL_RECEIVER_ADDRESS = "nenavizhu.leto@gmail.com"
const MAIL_SENDER_ADDRESS = "dedic-lead@dedic74.ru"

// express init
const app = express();
app.use(express.json());
app.use(cors());

// use /dist to serve static files
app.use("/", express.static(path.join(__dirname, "dist")));

const send_mail = async (contact) => {
  let testAccount = await nodemailer.createTestAccount();
  
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
		auth: {
      user: testAccount.user, 
      pass: testAccount.pass, 
    },
  }); 

	const info = await transporter.sendMail({
		from: MAIL_SENDER_ADDRESS,
		to: MAIL_RECEIVER_ADDRESS,
		subject: `Новая заявка`,
		text: `Имя: ${contact.name}\nТелефон: ${contact.phone}\nEmail: ${contact.mail}`
	});

	return (info.accepted, info);
}

app.post("/sendMail", (req, res) => {
	const contact = req.body;
	let result, info = send_mail(contact);
	res.status(result ? 200 : 500).json({
		result,
		data: info,
	});
});

app.listen(PORT, () => {
	console.log(`Server listen ${PORT}`);
});
