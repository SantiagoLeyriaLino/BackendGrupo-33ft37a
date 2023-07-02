const { sendBuy } = require('../../../services/nodeMailer')
const PDFDocument = require('pdfkit')
const blobStream = require('blob-stream')
const request = require('request')
const axios = require('axios')

const postControllerPurchase =  (data) => {
    const { email, dataPurchase, addressData } = data;

    const total = dataPurchase.products.reduce((cont, product) => {
        return cont + product.amount
    }, 0)

    const invoice = {
        shipping: {
            idUser: dataPurchase.idUser,
            name: addressData.address.name,
            address: addressData.address.address.line1,
            address2: addressData.address.address.line2,
            city: addressData.address.address.city,
            state: addressData.address.address.state,
            country: addressData.address.address.country,
            postal_code: addressData.address.address.postal_code
        },
        date: dataPurchase.date,
        items: dataPurchase.products,
        subtotal: total,
        desc: dataPurchase.desc*100,
        invoice_nr: 1234
    }

    console.log(invoice.desc)

    async function createInvoice(invoice) {
        let doc = new PDFDocument();

        doc.page.size = 'A4';
        doc.page.margins = { top: 50, bottom: 50, left: 50, right: 50 }
        
        async function fetchImage(src){
            const image = await axios.get(src, { responseType: 'arraybuffer' });
            return image.data
        }
        // const imageBuffer = Buffer.from(imageResponse.data, 'base64');
        // console.log(imageBuffer);

        const logo = await fetchImage('https://storage.googleapis.com/fashionfinds-ebf15.appspot.com/1688138945208.png')

        generateHeader(doc,logo);
        generateCustomerInformation(doc, invoice);
        generateInvoiceTable(doc, invoice);
        generateFooter(doc);

        // Crear un flujo de salida de tipo Blob
        const stream = doc.pipe(blobStream());

        // Escuchar el evento 'finish' del flujo de salida
        stream.on('finish', async () => {
            // Obtener el Blob del flujo de salida
            const pdfBlob = stream.toBlob("application/pdf");

            const pdfArrayBuffer = await pdfBlob.arrayBuffer();
            const pdfContent = Buffer.from(pdfArrayBuffer).toString('base64');

            // Enviar el correo electrónico con el PDF adjunto
            await sendBuy(email, pdfContent);
        });

        // Finalizar el documento PDF y cerrar el flujo de salida
        doc.end();
    }

    async function generateHeader(doc,logo) {

        // const imageResponse = await axios.get('https://storage.googleapis.com/fashionfinds-ebf15.appspot.com/1688138945208.png', { responseType: 'arraybuffer' });
        // const imageBuffer = Buffer.from(imageResponse.data, 'base64');
        // console.log(imageBuffer);

        // async function fetchImage(src){
        //     const image = await axios.get(src, { responseType: 'arraybuffer' });
        //     return image.data
        // }
        // // const imageBuffer = Buffer.from(imageResponse.data, 'base64');
        // // console.log(imageBuffer);

        // const logo = await fetchImage('https://storage.googleapis.com/fashionfinds-ebf15.appspot.com/1688138945208.png')
        // console.log(logo);
        doc
            
        //   .fillColor("#444444")
        //   .fontSize(20)
        //   .text("ACME Inc.", 110, 57)
        .image(logo, 50, 45, { width: 50 })
        .font('Helvetica-Bold').fontSize(12).text("Fashion Finds", 200, 50, { align: "right" })
        .fontSize(10).font('Helvetica')
        .text("AV.Gaspar Campos (Buenos Aires/Arg)/", 200, 65, { align: "right" })
        .text("Calle 132b (Bogota/Col)", 200, 80, { align: "right" })
        .moveDown();
    }

    function generateCustomerInformation(doc, invoice) {
        doc
            .fillColor("#444444")
            .fontSize(20)
            .text("Invoice", 50, 160);

        generateHr(doc, 185);

        const customerInformationTop = 200;

        doc
            .fontSize(10)
            .text("ID User:", 50, customerInformationTop)
            .font("Helvetica-Bold")
            .text(invoice.shipping.idUser, 150, customerInformationTop)
            .font("Helvetica")
            .text("Date:", 50, customerInformationTop + 15)
            .text(invoice.date, 150, customerInformationTop + 15)
            .text("Amount total:", 50, customerInformationTop + 30)
            .text(
                `- ${formatCurrency(invoice.subtotal - invoice.desc)}`,
                150,
                customerInformationTop + 30
            )

            .font("Helvetica-Bold")
            .text(invoice.shipping.name, 300, customerInformationTop)
            .font("Helvetica")
            .text(invoice.shipping.address, 300, customerInformationTop + 15)
            .text(
                invoice.shipping.city +
                ", " +
                invoice.shipping.state +
                ", " +
                invoice.shipping.country,
                300,
                customerInformationTop + 30
            )
            .moveDown();

        generateHr(doc, 252);
    }

    function generateInvoiceTable(doc, invoice) {
        let i;
        const invoiceTableTop = 330;

        doc.font("Helvetica-Bold");
        generateTableRow(
            doc,
            invoiceTableTop,
            "Name",
            "Size",
            "Unit Cost",
            "Quantity",
            "Line Total"
        );
        generateHr(doc, invoiceTableTop + 20);
        doc.font("Helvetica");

        for (i = 0; i < invoice.items.length; i++) {
            const item = invoice.items[i];
            const position = invoiceTableTop + (i + 1) * 30;
            generateTableRow(
                doc,
                position,
                item.name,
                item.size,
                formatCurrency(item.price),
                item.cant,
                formatCurrency(item.amount)
            );

            generateHr(doc, position + 20);
        }

        const subtotalPosition = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            subtotalPosition,
            "",
            "",
            "Subtotal",
            "",
            formatCurrency(invoice.subtotal)
        );

        const paidToDatePosition = subtotalPosition + 20;
        generateTableRow(
            doc,
            paidToDatePosition,
            "",
            "",
            "Cp.Desc",
            "",
            formatCurrency(invoice.desc)
        );

        const duePosition = paidToDatePosition + 25;
        doc.font("Helvetica-Bold");
        generateTableRow(
            doc,
            duePosition,
            "",
            "",
            "Total",
            "",
            formatCurrency(invoice.subtotal - invoice.desc)
        );
        doc.font("Helvetica");
    }

    function generateFooter(doc) {
        doc
            .fontSize(10)
            .text(
                "Payment is due within 15 days. Thank you for your business.",
                50,
                780,
                { align: "center", width: 500 }
            );
    }


    function generateTableRow(
        doc,
        y,
        item,
        description,
        unitCost,
        quantity,
        lineTotal
    ) {
        doc
            .fontSize(10)
            .text(item, 50, y, { width: 200 })
            .text(description, 0, y, { align: "center" })
            .text(unitCost, 300, y, { width: 90, align: "right" })
            .text(quantity, 400, y, { width: 70, align: "center" })
            .text(lineTotal, 0, y, { align: "right" });
    }

    function generateHr(doc, y) {
        doc
            .strokeColor("#aaaaaa")
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(550, y)
            .stroke();
    }

    function formatCurrency(cents) {
        return "$" + (cents / 100).toFixed(2);
    }


    createInvoice(invoice);

    let resp = 'algo';
    if (email) {
        resp = email;
    }

    return resp;
};



module.exports = postControllerPurchase;

// const Users = require('../../../db/models/usersSchema')
// const bcrypt = require('bcryptjs')
// const { sendBuy } = require('../../../services/nodeMailer')
// const PDFDocument = require('pdfkit')
// const blobStream = require('blob-stream')

// const nodemailer = require('nodemailer');
// const nodemailerSendgrid = require('nodemailer-sendgrid');
// require('dotenv').config();
// const { KEY_SENDGRID_EMAIL } = process.env;


// const postControllerPurchase = async (data) => {

//     const {email,dataPurchase} = data
//     const doc = new PDFDocument({bufferPages: true})

//     console.log(email)
//     let resp = 'algo'
//     if (email) {
//         resp = email
//     }


//     doc.text(`ID de usuario: ${dataPurchase.idUser}`);
//     doc.text(`Monto: $${dataPurchase.amount}`);
//     doc.text('Productos:');
//     dataPurchase.products.forEach((product) => {
//         doc.text(`- ID del producto: ${product.productId}`);
//         doc.text(`  Tamaño: ${product.size}`);
//         doc.text(`  Cantidad: ${product.cant}`);
//     });

//     const stream = doc.pipe(blobStream());

//     console.log(stream)

//     doc.end();


//     stream.on('finish', async() => {
//         const pdfBlob = stream.toBlob("application/pdf")

//         await sendBuy(email,pdfBlob)

//     })



//     return resp
// }
// //comentario
// module.exports = postControllerPurchase


// await sendBuy(data.email)

// const transport = nodemailer.createTransport(
        //     nodemailerSendgrid({
        //         apiKey: KEY_SENDGRID_EMAIL
        //     })
        // )

        // const mailOptions = {
        //     from: '"FashionFinds" <desarrolloBackendGrupo33@gmail.com>',
        //     to: `${email}`,
        //     subject: 'Boleta de compra',
        //     text: 'Adjuntamos la boleta de compra en formato PDF.',
        //     attachments: [
        //         {
        //             filename: 'boleta.pdf',
        //             content: pdfBlob,
        //         },
        //     ],
        // };

        // transport.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         console.error('Error al enviar el correo electrónico:', error);
        //         // Manejar el error en caso de fallo en el envío del correo electrónico
        //     } else {
        //         console.log('Correo electrónico enviado:', info.response);
        //         // Manejar la confirmación de envío del correo electrónico
        //     }
        // })


        //-----------------------------------------------------------------------------------------

        // const doc = new PDFDocument();

    // console.log(addressData)

    // doc.page.size = 'A4';
    // doc.page.margins = { top:20, bottom:20, left:20, right:20}

    // //Titulo de la boleta
    // doc.font('Helvetica-Bold').fontSize(20).text('Boleta de compra',{align:'center'})


    // // Dimensiones de los rectángulos
    // const rectWidth = 250;
    // const rectHeight = 100;
    // const rectSpacing = 30;

    // // Rectángulo para los datos de la empresa
    // const companyRectX = doc.page.margins.left;
    // const companyRectY = doc.page.margins.top;
    // doc.rect(companyRectX, companyRectY, rectWidth, rectHeight).stroke();

    // // Agregar los datos de la empresa dentro del rectángulo
    // doc.font('Helvetica-Bold').fontSize(12).text('Datos de la empresa:', companyRectX + 10, companyRectY + 10);
    // doc.text(`Nombre: `,{continued:true}, companyRectX + 10, companyRectY + 30);
    // doc.font('Helvetica').text(`Fashions Fiends`, companyRectX + 10, companyRectY + 30);
    // doc.font('Helvetica-Bold').text(`Dirección:`,{continued:true}, companyRectX + 10, companyRectY + 50);
    // doc.font('Helvetica').text(`Arturo Alio 2240`, companyRectX + 10, companyRectY + 50);
    // doc.font('Helvetica-Bold').text(`Teléfono: `,{continued:true}, companyRectX + 10, companyRectY + 70);
    // doc.font('Helvetica').text(`2234558286/2234874569`, companyRectX + 10, companyRectY + 70);

    // // Rectángulo para los datos del cliente
    // const clientRectX = companyRectX + rectWidth + rectSpacing;
    // const clientRectY = doc.page.margins.top;
    // doc.rect(clientRectX, clientRectY, rectWidth, rectHeight).stroke();

    // //Informacion del cliente}
    // doc.moveDown();
    // doc.font('Helvetica-Bold').fontSize(12).text('Informacion del cliente',clientRectX + 10, clientRectY + 10)
    // doc.font('Helvetica').text(`ID de usuario: ${dataPurchase.idUser}`,clientRectX + 10, clientRectY + 20);
    // doc.text(`Nombre: ${addressData.address.name}`,clientRectX + 10, clientRectY + 30)

    // doc.text(`Email: ${email}`,clientRectX + 10, clientRectY + 40)
    // doc.text(`Country: ${addressData.address.address.country}`,clientRectX + 10, clientRectY + 50)
    // doc.text(`State: ${addressData.address.address.state}`,clientRectX + 10, clientRectY + 60)
    // doc.text(`City: ${addressData.address.address.city}`,clientRectX + 10, clientRectY + 70)
    // doc.text(`Postal Code: ${addressData.address.address.postal_code}`,clientRectX + 10, clientRectY + 80)
    // doc.text(`Line 1: ${addressData.address.address.line1}`,clientRectX + 10, clientRectY + 90)
    // doc.text(`Line 2: ${addressData.address.address.line2}`,clientRectX + 10, clientRectY + 100)


    // //Detalles de la compra
    // doc.moveDown()
    // doc.font('Helvetica').fontSize(12).text('Detalles de la compra:');
    // doc.font('Helvetica-Bold').text(`${dataPurchase.date}`);

    // doc.moveDown()
    // doc.font('Helvetica-Bold').text('Producto', { width: 150, continued: true, align: 'left' });
    // doc.font('Helvetica-Bold').text('Cantidad', { width: 75, continued: true, align: 'right' });
    // doc.font('Helvetica-Bold').text('Precio', { width: 75, align: 'right' });

    // doc.text(`Monto: $${dataPurchase.amount}`);
    // doc.text('Productos:');
    // dataPurchase.products.forEach((product) => {
    //     doc.text(`- ID del producto: ${product.productId}`);
    //     doc.text(`  Tamaño: ${product.size}`);
    //     doc.text(`  Cantidad: ${product.cant}`);
    // });

    // // Crear un flujo de salida de tipo Blob
    // const stream = doc.pipe(blobStream());

    // // Escuchar el evento 'finish' del flujo de salida
    // stream.on('finish', async () => {
    //     // Obtener el Blob del flujo de salida
    //     const pdfBlob = stream.toBlob("application/pdf");

    //     const pdfArrayBuffer = await pdfBlob.arrayBuffer();
    //     const pdfContent = Buffer.from(pdfArrayBuffer).toString('base64');

    //     // Enviar el correo electrónico con el PDF adjunto
    //     await sendBuy(email, pdfContent);
    // });

    // // Finalizar el documento PDF y cerrar el flujo de salida
    // doc.end();