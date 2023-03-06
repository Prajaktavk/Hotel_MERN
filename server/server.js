require("dotenv").config();
const express=require("express");
const app=express();
const usersRoute=require("./routes/usersRoute")
const roomsRoute=require("./routes/roomsRoute")
const bookingsRoute=require("./routes/bookingsRoute")
require('./db');
app.use(express.json())

app.use('/api/rooms',roomsRoute)
app.use('/api/users',usersRoute)
app.use('/api/bookings',bookingsRoute)
const port=process.env.PORT|| 5000

app.listen(port,()=>(

    console.log(`Server start at Port No:${port}`)
    ))
    