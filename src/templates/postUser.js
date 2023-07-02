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

        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #ff8800;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
        
        .confirmation-text {
          font-weight: bold;
          color: #ff8800;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to FashionFinds</h1>
        <p>Hello!</p>
        <p>Thank you for registering with FashionFinds. We hope you enjoy our platform.</p>
        <p class="confirmation-text">Before proceeding, please confirm your account by clicking the button below:</p>
        <a href="https://frontend-grupo33-ft37a.vercel.app/autenticate" class="button">Confirm Account</a>
        <p>Start discovering the latest fashion trends and finding the best deals!</p>
        <p>If you have any questions or need assistance, feel free to contact our support team.</p>
        <p>Have a great day!</p>
      </div>
    </body>
    </html>
  `;
};