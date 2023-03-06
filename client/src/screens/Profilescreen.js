import { React, useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";

// import Error from "../components/Error";
import swal from "sweetalert";
import { Tag } from 'antd';
const Profilescreen = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="ml-3 mt-3">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Profile",
            key: "1",
            children: (
              <div>
                <h1>My Profile </h1>
                <br />
                <h1>Name: {user.name}</h1>
                <h1>Email: {user.email}</h1>
                <h1>isAdmin: {user.isAdmin? "Yes": "No"}</h1>
              </div>
            ),
          },
          {
            label: "Bookings",
            key: "2",
            children: <MyBookings />,
          },
        ]}
      />
    </div>
  );
};

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [loading, setloading] = useState(false);
  const [bookings, setbookings] = useState();
  const [error, seterror] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);

        const data = (
          await axios.post("/api/bookings/getbookingsbyuserid", {
            userid: user._id,
          })
        ).data;

        console.log(data);

        setbookings(data);

        setloading(false);
      } catch (err) {
        seterror(true);
        console.log(err);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);

      const result = (
        await axios.post("/api/bookings/cancelbooking", { bookingid, roomid })
      ).data;
      console.log(result);
      setloading(false);
      swal("Congrats", "Your Booking has been cancelled", "success").then(
        result => {
          window.location.reload();
        }
      );
    } catch (err) {
      console.log(err);
      setloading(false);
      swal("Oops!", "Something went wrong", "error");
    }
  }
  return (
    <div className="row">
      <div className="col-md-6">
        {loading && <Loader />}
        {bookings &&
          bookings.map((booking) => {
            return (
              <div className="bs">
                <h1>{booking.room}</h1>
                <p><b>Booking ID : </b>{booking._id}</p>
                <p><b>Check IN :</b> {booking.fromdate}</p>
                <p><b>Check OUT: </b>{booking.todate}</p>
                <p><b>Amount : </b>{booking.totalamount}</p>
                <p>
                <b>Status :</b> {" "}
                  {booking.status === "cancelled"?( <Tag color="red">CANCELLED</Tag>) :(<Tag color="green">CONFIRMED</Tag> )}
                </p>
                <div className="text-right">
                  {booking.status !== "cancelled" && (
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        cancelBooking(booking._id, booking.roomid);
                      }}
                    >
                      CANCEL BOOKING
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
