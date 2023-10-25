const nodemailer = require('nodemailer');

const {
    MAIL_USERNAME,
    MAIL_PASSWORD
} = process.env

const transporter  = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user: MAIL_USERNAME,
        pass: MAIL_PASSWORD
    }
});

const sendEmail = async(to, subject, text, html)=>{
    const mailOptions={
        from: MAIL_USERNAME,
        to,
        subject,
        text,
        html
    };

    try{
        await transporter.sendMail(mailOptions);
        console.log(`Correo electrónico enviado a ${to}`);
    }catch (error){
        console.log("Error al enviar el correo electrónico", error);
    }
}

module.exports = {sendEmail}
