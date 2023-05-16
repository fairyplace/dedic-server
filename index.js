const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const nodemailer = require("nodemailer");
const PORT = 5050;
app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }))

app.use("/", express.static(path.join(__dirname, "dist")));

const sendMail = async (main_info) => {
  let testAccount = await nodemailer.createTestAccount();
  
  const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  }); 
}
app.post("/sendMail", (req, res) => {
	console.log(req.body);
	let result = true;
	res.status(result ? 200 : 500).json({
		result,
		data: req.body,
	});
});

// app.get('/', (req, res) => {
//   res.sendFile('./index.html')
// })

app.get("/sendMail", (req, res) => {
	res.json();
});
app.listen(PORT, () => {
	console.log(`Server listen ${PORT}`);
});
