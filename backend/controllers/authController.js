import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { comparePassword, hashPassword } from "../utils/authHelper.js"; // Ensure .js extension is included



export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !phone || !address||!answer) {
      return res.status(400).send({
        success: false,
        message: 'All fields are required'
      });
    }
    
    

    // Check if the user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(200).send({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    
    // Save the user to the database
    await user.save();

    // Send the response
    res.send({
      success: true,
      message: 'User created successfully',
      user
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Internal server error',
      error
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'All fields are required'
      });
    }
  
  
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: 'Invalid password'
      });
    }

    // Create a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // Send the response
    res.send({
      success: true,
      message: 'User logged in successfully',
      token
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in Login',
      error
    
  })
  }
}

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const testcontroller = async (req, res) => {
  res.send('Protected route accessed');
}