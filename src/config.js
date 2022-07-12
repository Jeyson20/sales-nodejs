import { config } from "dotenv"
config();

export default{
   port:process.env.PORT || 3000,
   dbuser:process.env.DB_USER || '',
   dbPass: process.env.DB_PWD || '',
   dbName:process.env.DB_NAME || '',
   dbServer: process.env.DB_SERVER || '',
}