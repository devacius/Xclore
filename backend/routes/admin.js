const express= require("express");

const User=require("../models/User");
const adminrouter=express.Router();
adminrouter.get("/",async (req,res)=>{
    
        const users = await User.find({});
        res.json(users);
      });

      adminrouter.post("/",async (req,res)=>{
        const { firstName, lastName, email, password, role } = req.body;
        const userExists = await User.findOne({ email });
      
        if (userExists) {
          return res.status(400).json({ message: 'User already exists' });
        }
      
        const user = await User.create({ firstName, lastName, email, password, role });
      
        if (user) {
          res.status(201).json(user);
        } else {
          res.status(400).json({ message: 'Invalid user data' });
        }
      })
      
      
        
adminrouter.put("/:id", async (req,res)=>{
    const user = await User.findById(req.params.id);
      
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
  
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
    });
      
      
  
    
      
    adminrouter.delete("/:id", async (req,res)=>{
        const user = await User.findById(req.params.id);
      
        if (user) {
          await user.remove();
          res.json({ message: 'User removed' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
    });
    
    module.exports=adminrouter;
        
     
      
