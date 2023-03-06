const express = require("express");

const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const stripe = require("stripe")("sk_test_51MfkXNSCGEEUs3MqU4McL7FWZqOhqhWKwVmr7ts15vGqOgD3Ef6wGrG1jMAgTiUga9PpDfu1TeXIjhLZeaLKvQi100cSHmPF5L");
//To generate unique ids


const { v4: uuidv4 } = require("uuid");

router.post("/bookroom", async (req, res) => {
 
  const { room, userid, fromdate, todate, totalamount, totaldays,
    //  token 
    } =
    req.body;
  // try {
  //   const customer = await stripe.customers.create({
  //     email: token.email,
  //     source: token.id,
  //   });

  //   const payment = await stripe.charges.create(
  //     {
  //       amount: totalamount * 100,
  //       customer: customer.id,
  //       currency: "inr",
  //       receipt_email: token.email,
  //     },
  //     {
  //       idempotencyKey: uuid,
  //     }
  //   );
    
  //   if (payment) {
      try{
        const newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          fromdate,
          todate,
          totalamount,
          totaldays,
          transactionId: "1234",
        });

        const booking = await newbooking.save();
        const roomtemp = await Room.findOne({ _id: room._id });
        roomtemp.currentBookings.push({
          bookingid: booking._id,
          fromdate: fromdate,
          todate: todate,
          status: booking.status,
        });

        await roomtemp.save();
        res.send("Room Booked Successfully");
      
    // }
  
  } catch (error) {
    return res.status(400).json({ error });
  }
});




router.post('/getbookingsbyuserid', async (req,res)=>{
  const userid = req.body.userid
  try{
    const bookings = await Booking.find({userid:userid})
    res.send(bookings)
  }
  catch(err){
    return res.status(400).json({err});
  }
});



router.post('/cancelbooking', async (req,res)=>{
  const {bookingid,roomid} = req.body
  try{
    
    const bookingitem = await Booking.findOne({_id : bookingid})
    
    bookingitem.status = 'cancelled'
    await bookingitem.save()
    
    const room = await Room.findOne({_id : roomid});

    const bookings = room.currentBookings

    const temp = bookings.filter(booking => booking.bookingid.toString()!==bookingid)

    room.currentBookings = temp

    await room.save()
    res.send("Your Booking cancelled successfully")

  }
  catch(err){
    return res.status(400).json({err});
  }
});

router.get('/getallbookings', async (req,res)=>{


  try{

    const bookings = await Booking.find()
    res.send(bookings)
  }
  catch(err){
    return res.status(400).json({err});
  }
});

module.exports = router;
