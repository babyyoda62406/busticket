import Server from "./model/Server";

const PORT = Number(process.env.PORT) || 3000;

// console.log(process.env.PORT); 
// console.log(process.env.DB_NAME);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_URL);
// console.log(process.env.SECRETORPRIVATEKEY);
// console.log(process.env.TOKEN_EXPIRED_IN);


const server = new Server(PORT);
server.run();