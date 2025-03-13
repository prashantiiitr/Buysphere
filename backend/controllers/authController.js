import userModel from "../models/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { comparePassword, hashPassword } from "../utils/authHelper.js"; // Ensure .js extension is included



export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password || !phone || !address) {
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
      address
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
export const testcontroller = async (req, res) => {
  res.send('Protected route accessed');
}