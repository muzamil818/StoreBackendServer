const express = require("express")
const dotenv = require ("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json());


app.get("/", (req, res)=>{
    res.send("Api is running!")
})

console.log("MONGO_URI =>", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongoDb is connected");

    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`server is running on http://localhost:${process.env.PORT}`);
        
    })
    
}).catch((err) => console.error("DB Connection Error:", err));