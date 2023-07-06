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
                `${formatCurrency(invoice.subtotal - invoice.desc)}`,
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
            `- ${formatCurrency(invoice.desc)}`
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