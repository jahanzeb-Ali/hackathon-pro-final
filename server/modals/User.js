

import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_Url).then(
  console.log("Db is connected")
)

const userSchema = new mongoose.Schema(
  {
    cnic: {
      type: String,
      required: true,
      unique: true, // Ensuring the CNIC is unique for each user
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensuring the email is unique
      lowercase: true, // Convert email to lowercase for consistency
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Basic email validation
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    
  }
);

const User = mongoose.model("UsersInMicro", userSchema);

export default User;
