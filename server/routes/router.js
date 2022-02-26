const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// router.get("/",(req,res) => {
//     console.log("connect");
// })


//registering user
router.post("/register", async (req, res) => {
  //   console.log(req.body);
  const { name, email, age, mobile, work, addr, desc } = req.body;
  if (!name || !email || !age || !mobile || !work || !addr || !desc) {
    res.status(422).json("please fill the data");
  }
  try {
      const preuser = await users.findOne({email:email});
      console.log(preuser);
      if(preuser){
          res.status(422).json("user is alreaady registered ");
      }else{
          const adduser = new users({
            name,
            email,
            age,
            mobile,
            work,
            addr,
            desc,
          });

          await adduser.save();
          res.status(201).json(adduser);
          console.log(adduser);
      }


  } catch(error) {
      res.status(422).json(error);
   
  }
});




//get users data
router.get("/getdata",async(req,res) => {
    try{

        const userdata = await users.find();
        res.status(200).json(userdata);
        console.log(userdata);

    }
    catch(error){
        res.status(404).json(error);

    }
})



//single user data

router.get("/getuser/:id",async(req,res)=>{
    try{
        console.log(req.params)
        const {id}= req.params;
        const userindividual = await users.findById({_id:id})
        console.log(userindividual);
        res.status(201).json(userindividual);
    }
    catch(error) {

    res.status(404).json(error);
    }

})


//update user data

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateduser);
    res.status(201).json(updateduser);
  } catch (error) {
    res.status(422).json(error);
  }
});

//delete user

router.delete("/deleteuser/:id",async(req,res) => {
     try {
       const { id } = req.params;

       const deleteuser = await users.findByIdAndDelete({_id:id});

       console.log(deleteuser);
       res.status(201).json(deleteuser);
     } catch (error) {
       res.status(422).json(error);
     }

})




module.exports = router;
