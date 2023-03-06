const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
  try {
    
    const rooms = await Room.find({});
    
    return res.send(rooms);

  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});

router.post("/getroombyid", async (req, res) => {

  const roomid = req.body.roomid
  try {
    
    const room = await Room.findOne({_id : roomid});
    
    return res.send(room);

  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});

router.post("/addroom", async (req, res) => {

 
  try {
    
    const newroom = new Room(req.body);
    await newroom.save()
    res.send("New Room Added Successfully");

  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
});
module.exports = router;
