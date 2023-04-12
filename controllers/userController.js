const{User}=require("../models/user");
const{UserVerification}=require("../models/UserVerification");
const nodemailer = require("nodemailer");

const {v4: uuidv4} = require("uuid");

//Password handler
const bcrypt = require('bcrypt');

require("dotenv").config();


const userController = {
    //add user
    addUser:async(req,res)=>{
        try {
            const newUser=new User(req.body);
            const saveUser=await newUser.save();
            if (req.body.user) {
                const user = User.findById(req.body.user);
                await user.updateOne({ $push: { users: saveUser._id } });
              }
            res.status(200).json(saveUser);

        }catch(err){
          console.log(err);
            res.status(500).json(err);
        }

    },
    //GET ALL BOOKS
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A BOOK
  getAUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("user");
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE BOOK
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE BOOK
  deleteUser: async (req, res) => {
    try {
      await User.updateMany(
        { users: req.params.id },
        { $pull: { users: req.params.id } }
      );
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  signup: async (req, res) => {
    var user = new User(req.body);
    var email = req.body.email.trim();
    var birthday = req.body.birthday;
    if(req.body.email == "" || req.body.password == "" || req.body.birthday == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
    }
    else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(req.body.email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        })
    }
    else if(req.body.password.length < 6) {
        res.json({
            status : "FAILED",
            message: "Password is too short!"
        })
    }
    else if(!new Date(birthday)){
      res.json({
        status: "FAILED",
        message: "Invalid date of birth entered"
      })
    }
    else {
        User.find({email: req.body.email}).then(result=>{
            if(result.length){
                res.json({
                    status: "FAILED",
                    message: "User with the provided email already exists"
                })
            }
            else{
                const saltRounds = 10;
                bcrypt.hash(req.body.password,saltRounds).then(hashedPassword=>{
                    const newUser = new User({
                        email: req.body.email,
                        birthday: req.body.birthday,
                        password: hashedPassword,
                    });
                    newUser.save().then(result=>{
                        res.json({
                            status: "SUCCESS",
                            message: "Signup successful",
                            data: result,
                        })
                    })
                    .catch(err=>{
                        console.log(err);
                        res.json({
                            status: "FAILED",
                            message: "An error occurred while saving user account!"
                        })
                    })
                })
                .catch(err=>{
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while hashing password!"
                    })
                })
            }
        }).catch(err=>{
            console.log(err);
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user!"
            })
        })
        }
      },

      signin: async (req, res) => {
        var email = req.body.email
        var password = req.body.password
        if(email == "" || password == "" ){
            res.json({
                status: "FAILED",
                message: "Empty credential supplied!"
            });
        } 
        else {
          User.find({email})
          .then(data => {
            if(data) {
              const hashedPassword = data[0].password;
              bcrypt.compare(password,hashedPassword).then(result => {
                if(result) {
                  res.json({
                    status: "SUCCESS",
                    message: "Signin successfull",
                    data: data
                  })
                } else {
                  res.json({
                    status: "FAILED",
                    message: "Invalid password entered!"
                  })
                }
              })
              .catch(err => {
                res.json({
                  status: "FAILED",
                  message: "An error occured while comparing passwords"
                })
              })
            } else {
              res.json({
                status: "FAILED",
                message: "Invalid credentials entered!"
              })
            }
          })
          .catch(err => {
            res.json({
              status: "FAILED",
              message: "An error occurred while checking for existing user"
            })
          })
        }
      }

  };

  

module.exports=userController;