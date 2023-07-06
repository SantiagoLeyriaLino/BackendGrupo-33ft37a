module.exports = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Thank you for subscribing to our Newsletter</title>
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
          <h1>Thank you for subscribing to our Newsletter</h1>
          <p>Hello!</p>
          <p>In the next few days you will receive information about our products.</p>
          <p>About offers, promotions, product sales, events.</p>
          <p>Keep an eye out for limited-time promotions.</p>
          <p>Thank you for giving us the opportunity to continue to grow.</p>
          <p>Have a great day!</p>
        </div>
      </body>
      </html>
    `;
};