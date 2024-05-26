const express = require("express");
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');

app.use(cors());
app.use(express.json());


app.get("/" , async(req,res)=>{
    res.send({succes : "Hi"});   
});

app.post("/send-message" , async(req,res)=>{

    // Create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
      auth: {
        user: 'manthan8dimble@gmail.com', // Your email address
        pass: 'albc tvtl lzim vqqj', // Your email password
      },
    });
  
    try {
      let info = await transporter.sendMail({
        from: 'manthan8dimble@gmail.com', // Sender address
        to: 'manthan8dimble@gmail.com', // List of receivers
        subject: "New Message from your Portfolio!", // Subject line
        text: "", // Plain text body
        html : `Sender's details\n<br/>
        1. Name : ${req.body.firstName} ${req.body.lastName}\n<br/>
        2. Email : ${req.body.email}\n<br/>
        3. Phone : ${req.body.phone}\n<br/>
        4. Category : ${req.body.category}\n<br/>
        5. Message : ${req.body.message}\n
        `
      });
    //   console.log('Message sent: %s', info.messageId);
      res.status(200).json({ success: 'Message sent successfully , we will get back to you asap!' });
    } catch (error) {
    //   console.error('Error sending email: %s', error);
      res.status(500).json({ error: 'Error sending email' });
    }
});


app.listen(5000);