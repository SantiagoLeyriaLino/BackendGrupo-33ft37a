const server = require("./src/server");
const db = require("./src/db/db");

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
    console.log('Listen on port 3001');
})

db();
