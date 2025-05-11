// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); // Import dotenv

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection using environment variable
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Mongoose Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  contact: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

// Route to handle form data
app.post("/contact", async (req, res) => {
  try {
    const { name, contact, email, message } = req.body;
    const newContact = new Contact({ name, contact, email, message });
    await newContact.save();
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Use the port from environment variable or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
