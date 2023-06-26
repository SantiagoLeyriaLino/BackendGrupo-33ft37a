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
          <h1>Welcome to FashionFinds</h1>
          <p>Hello!</p>
          <p>Thank you for registering with FashionFinds. We hope you enjoy our platform.</p>
          <p>Start discovering the latest fashion trends and finding the best deals!</p>
          <p>If you have any questions or need assistance, feel free to contact our support team.</p>
          <p>Have a great day!</p>
        </div>
      </body>
      </html>
    `;
};