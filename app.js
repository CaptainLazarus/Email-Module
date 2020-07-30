const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

EMAIL = '11';
PASSWORD = '11';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
    name: 'server name' , 
    host: 'host name', 
    secure: true,
    auth:{
        user:`${EMAIL}`,
        pass:`${PASSWORD}`
    }
});

app.post('/', (req, res) => {

    function Send() {   
        var verify = Math.floor((Math.random() * 10000000) + 1);

        var mailOption = {
            from :`${EMAIL}`,
            to : `${req.body.email}`,
            subject: "Account Verification",
            html: `<p>Please verify your account</p><br><hr>
        <br><a href="http://localhost:3000/verification/?verify=${verify}"><p>Click here to verify mail</p></a>`
        }

        transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                console.log(error)
            }else{
                res.send("Mail Sent");
            }
        });
    }

    Send();
})

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

app.listen(3000);