const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const port = 3010;
const  cors = require('cors');
const bodyParser = require('body-parser');


app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



let transporter = nodemailer.createTransport({
    service:'gmail',
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
        user: "rn.lazuka@gmail.com", // generated ethereal user
        pass: "11218536191Ws" // generated ethereal password
    }
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/sendMessage',async (req, res) => {
let {name,mail,text}= req.body;
    let info = await transporter.sendMail({
        from: 'MyProfile', // sender address
        to: "rn.lazuka@gmail.com", // list of receivers
        subject: "Новое сообщение", // Subject line
        // text:  // plain text body
        html: `<b>Сообщение с Profile page</b>,<div>Name:${name}</div>
            <div>Mail:${mail}</div><div>Text:${text}</div>`, // html body
    });
    res.send("ok")
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));