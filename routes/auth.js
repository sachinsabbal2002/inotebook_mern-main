const express = require('express');
const User = require('../models/User');
const router = express.Router();// router ka used karna hai route banake liye 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb$oy';
// anb router.get() likna padega 
router.get('/',(req,res)=>{
  // to get data from req body 
  var bodyData=req.body;
  console.log("req body data",bodyData)
  console.log("this is data on get request")
 return  res.json({"mess ON GEt":"this is send from url hit localhodt:5000/api/auth ,from router/auth.js"})
})

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
var success=true
router.post('/createuser', [
  
  // this is validation array to varify data coming is as per describe
  // validation required in post req
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already in the User object/modal/collection
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user in ewxisting databse using create()
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    // yaha se create user ke authtoken create kar rah hua (id ko used karke)
    const authtoken = jwt.sign(data, JWT_SECRET);
    // res.json(user)
    // response me new user ki authkon send kar raha hua 
    res.json({ "mess":"new user create","name":user.name,"authtoken": authtoken,success })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
// to login we required 1: email  2: password
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);// validdate kar ke result ko rakh raha hai
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });// database ke User_Collection me se {req.body ke email ko used }karke user ko find kar rah ahua
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);// password ko match kar raha hu
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ "mess":`Welcome ${user.name}`, authtoken ,success})// login ho gaya tab authtoken ko send akr raha hau

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }


});


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router