module.exports = (data) => {
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
          <h1>Hello ${data.name}!</h1>
          <p>Your message is important to us, we will contact you shortly.</p>
          <p class="confirmation-text">FashionFinds support team</p>
        </div>
      </body>
      </html>
    `;
  };