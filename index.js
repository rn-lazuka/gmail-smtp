const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const  cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || "---";
let smtp_password = process.env.SMTP_PASSWORD || "---";
let smtp_receiver = process.env.SMTP_RECEIVER || "---";



let transporter = nodemailer.createTransport({
    service:'gmail',
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password // generated ethereal password
    }
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/sendMessage',async (req, res) => {
let {name,mail,text}= req.body;
    let info = await transporter.sendMail({
        from: 'MyProfile', // sender address
        to: smtp_receiver, // list of receivers
        subject: "Новое сообщение", // Subject line
        // text:  // plain text body
        html: `<b>Сообщение с Profile page</b>,<div>Name:${name}</div>
            <div>Mail:${mail}</div><div>Text:${text}</div>`, // html body
    });
    res.send("ok")
});

let port = process.env.PORT || ж

app.listen(port, () => console.log(`Example app listening on port ${port}!`));