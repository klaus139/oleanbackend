"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground"
const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const REFRESH_TOKEN = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;
const sendEmail = (to, url, txt) => __awaiter(void 0, void 0, void 0, function* () {
    // const oAuth2Client = new OAuth2Client(
    //     CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND
    // )
    // oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})
    try {
        const access_token = jsonwebtoken_1.default.sign({ CLIENT_ID, CLIENT_SECRET }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });
        console.log(access_token);
        const transpost = nodemailer.createTransport({
            service: "GMAIL",
            secure: false,
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
        };
        const result = yield transpost.sendMail(mailOptions);
        return result;
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = sendEmail;
