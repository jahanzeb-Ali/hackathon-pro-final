import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type : String , require : true,  },
    password: { type: String, require: true, }
})

const User = mongoose.model("users", userSchema);
mongoose.connect(process.env.MONGODB_Url)
    .then(() => {
        console.log("Mongodb connected")
}).catch(e => { console.log(e.message) })

export default User;