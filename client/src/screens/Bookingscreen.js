import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import swal from 'sweetalert';
import  {useNavigate} from "react-router-dom";
function Bookingscreen() {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const [room, setroom] = useState();
  const [error, seterror] = useState();

  let { id, fromdate, todate } = useParams();
  
       
  const firstdate = moment(fromdate, "DD-MM-YYYY");
  const lastdate = moment(todate, "DD-MM-YYYY");
  // asDays the difference in days
  // +1 is the firstdate should be included
  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays() + 1;
  const [totalamount, settotalamount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if(!localStorage.getItem('currentUser')){
        navigate("/login")
      }
      try {
        setloading(true);
        const data = (
          await axios.post("/api/rooms/getroombyid", { roomid: id })
        ).data;
        settotalamount(data.rentperday * totaldays);
        setroom(data);
        setloading(false);
        console.log(data);
      } catch (err) {
        seterror(true);
        console.log(err);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function onToken(token) {
    console.log(token);
    const bookingdetails = {
      room,
      userid:JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
      token
    };
    try {
      setloading(true);
      const result = await axios.post("/api/bookings/bookroom",bookingdetails);
      setloading(false);
      swal("Congrulations","Your Booked Successfully",'success').then(result=>{
        window.location.href='/profile'
        
      });
      
      
    } catch (error) {
      console.log(error);
      swal("Oops!", "Something went wrong", "error");
    }
  }
  return (
    <div className="m-5" >
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total Days: {totaldays} </p>
                  <p>Rent per day: {room.rentperday} </p>
                  <p>Total Amount: {totalamount} </p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51MfkXNSCGEEUs3Mqp96Agao6waz7hH0JMpEeu3KxtpCzENRQDlu1C7rUL1rD1BiNX3sjJzQsciXcV2txn5goP67i00oX7cPMoh"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
