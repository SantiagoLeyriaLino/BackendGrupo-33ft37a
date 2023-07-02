module.exports = () => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to FashionFinds</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          color: #333333;
          padding: 20px;
          margin: 0;
        }

        h1 {
          color: #ff8800;
        }

        p {
          margin-bottom: 10px;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Successful purchase!</h1>
        <p>Hello!</p>
        <p>Thank you for your purchase, in these days the product is arriving. When it arrives you will be able to make a review of it.</p>
        <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        <p>Have a great day!</p>
      </div>
    </body>
    </html>
  `;
};