const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


//MongoDB connection 

mongoose.connect("mongodb+srv://nigamkhushi731:rRqgXq22VH2MOyuY@cluster0.cmiswzc.mongodb.net/nigamkhushi731")


.then(()=>console.log("MongpDB Connected"))
.catch((err)=> console.log(err));

//Mongoose Schema 
const ContactSchema = new mongoose.Schema({
    name: String,
    contact: String,
    email: String,
    message: String,
});

const Contact = mongoose.model("Contact",ContactSchema);

// Route to handle from data

app.post("/contact",async(req,res)=>{
    try{
   const { name, contact, email, message} = req.body;
   const newContact = new Contact({name, contact, email, message });
   await newContact.save();
   res.status(200).json({message: "Form submitted successfully"});
     }
     catch(error){
        res.status(500).json({error: "Internal Server Error"});
     }
});

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})