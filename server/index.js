import express from "express"
import 'dotenv/config'
import cors from "cors"
import Auth from "./routes/auth.js"
import LoanRoute from "./routes/loan.js"


const PORT = process.env.PORT;

const corsOptions = {
  origin: ['http://localhost:3000'], 
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));




app.use("/", Auth)
app.use("/" , LoanRoute)


app.listen(PORT, () => {
    console.log("Server running at Port : ",PORT )
})