const nodemailer = require('nodemailer')
import jwt from 'jsonwebtoken'
import { OAuth2Client } from "google-auth-library"

//const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground"

const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`

const sendEmail = async (to:string, url: string, txt: string) => {
    // const oAuth2Client = new OAuth2Client(
    //     CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND
    // )
    // oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

    try{
        const access_token = jwt.sign({ CLIENT_ID, CLIENT_SECRET }, process.env.JWT_ACCOUNT_ACTIVATION!, { expiresIn: '10m' });
        console.log(access_token)

        const transpost = nodemailer.createTransport({
            service: "GMAIL",
            secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.HOTMAIL_USER, 
      pass: process.env.HOTMAIL_PASS
    }, 
    tls: {
        rejectUnauthorized: false
    }
        });

        const mailOptions = {
            from: SENDER_MAIL,
            to: to,
            subject: `Account activation link`,
            html: `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Olean Project.</h2>
            <p>Congratulations! You're almost set to start using Olean Project.
                Just click the button below to validate your email address.
            </p>
            <p>Please use the following link to activate your acccount:</p>
           
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://oleanproject.com</p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
            `
        }

        const result = await transpost.sendMail(mailOptions)
        return result;

        
     
    } catch(err) {
        console.log(err);
    }
}


  
 
  
  
  
  
  
  

export default sendEmail;