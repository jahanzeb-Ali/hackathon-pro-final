import express from "express"
import 'dotenv/config'
import cors from "cors"
import Auth from "./routes/auth.js"



const app = express();
const PORT = process.env.PORT;
app.use(cors())
app.use(express.json())



app.use("/", Auth)




app.listen(PORT, () => {
    console.log("Server running at Port : ",PORT )
})