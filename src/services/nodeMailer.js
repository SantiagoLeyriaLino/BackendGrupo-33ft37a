const nodemailer = require('nodemailer');
const templatePostUser = require('../templates/postUser.js');
const templatePostBuy = require('../templates/postBuy.js')
const templatePostComment = require('../templates/postComment.js')
const templateResponseComment = require('../templates/responseComment.js')
const templateNewsletter = require ('../templates/postNewsletter.js')
const nodemailerSendgrid = require('nodemailer-sendgrid');
require('dotenv').config();
const path = require('path');
const postNewsletter = require('../templates/postNewsletter.js');
const { KEY_SENDGRID_EMAIL } = process.env;

const transporter = () => {
    // ! Host para hacer pruebas, el real solo deja 100 correos por dia
    // const transport = nodemailer.createTransport({
    //     host: "sandbox.smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //         user: "f8abc67a0c6ce7",
    //         pass: "c7d84ef0bda9ee"
    //     }
    // });

    // ! Host real, restrinje correos masivos o con cantidad mayor a 100 destinatarios por dia
    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: KEY_SENDGRID_EMAIL
        })
    )
    return transport;
};


const sendEmail = async (toEmail) => {
    const transporterConection = transporter();
    const info = await transporterConection.sendMail({
        from: '"FashionFinds" <desarrolloBackendGrupo33@gmail.com>',
        to: `${toEmail}`,
        subject: "FashionFinds",
        html: templatePostUser(),
    });
    return;
};

const sendBuy = async (toEmail, pdf) => {
    const transporterConection = transporter();
    const info = await transporterConection.sendMail({
        from: '"FashionFinds" <desarrolloBackendGrupo33@gmail.com>',
        to: `${toEmail}`,
        subject: "FashionFinds",
        html:templatePostBuy(),
        attachments: [
            {
                filename: 'boleta.pdf',
                content: pdf,
            },
        ],
        
    });
    return;
};

const sendComment = async(data) =>{
    const transporterConection = transporter();
    const info = await transporterConection.sendMail({
        from: '"FashionFinds" <desarrolloBackendGrupo33@gmail.com>',
        to: `desarrolloBackendGrupo33@gmail.com`,
        subject: "FashionFinds",
        html: templatePostComment(data),
    });
    return;
}

const responseComment = async(data) =>{
    const transporterConection = transporter();
    const info = await transporterConection.sendMail({
        from: '"FashionFinds" <desarrolloBackendGrupo33@gmail.com>',
        to: `${data.email}`,
        subject: "FashionFinds",
        html: templateResponseComment(data),
    });
    return;
}
const sendNewsletter = async(email) =>{
    const transporterConection = transporter();
    const info = await transporterConection.sendMail({
        from: '"FashionFinds" <desarrolloBackendGrupo33@gmail.com>',
        to: `${email}`,
        subject: "FashionFinds",
        html: templateNewsletter(),
    });
    return;
}

module.exports = {sendEmail, sendBuy, responseComment, sendComment, sendNewsletter};
