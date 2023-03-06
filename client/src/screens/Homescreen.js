import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import "antd/dist/reset.css";

import moment from "moment";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [duplicaterooms, setduplicaterooms] = useState([]);

  const[searchkey,setsearchkey]=useState()
  const[type,settype]=useState('all')

  useEffect(() => {
    
    const fetchData = async () => {
     
      try {
        
        setloading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        console.log(data);

        setrooms(data);
        setduplicaterooms(data);
        setloading(false);

      } catch (error) {
        seterror(true);
        console.log(error);
        seterror(false);
      }
    };

    fetchData();
  }, []);

  
  function filterByDate(dates) {
    
    setfromdate(moment(dates[0].$d).format("DD-MM-YYYY"));
    
    settodate(moment(dates[1].$d).format("DD-MM-YYYY"));
    
    var temprooms = [];
    var availability = false;
    
    for (const room of duplicaterooms) {
     
      if (room.currentBookings.length > 0) {
        
        for (const booking of room.currentBookings) {
          
          if ( !moment(moment(dates[0].$d).format("DD-MM-YYYY")).isBetween(booking.fromdate,booking.todate) &&
           
            !moment(moment(dates[0].$d).format("DD-MM-YYYY")).isBetween(booking.fromdate, booking.todate)) 
            {
             if (
              moment(dates[0].$d).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[0].$d).format("DD-MM-YYYY") !== booking.todate &&
              moment(dates[1].$d).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(dates[1].$d).format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.currentBookings.length === 0) {
        temprooms.push(room);
      }
      setrooms(temprooms);
    }
  }

  function filterBySearch(){

    const temprooms=duplicaterooms.filter(room=>room.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temprooms)
  }

  function filterByType(e){
    //in selection list includes() is not included
    settype(e)
    if(e!=="all"){
      
      const temprooms=duplicaterooms.filter(room=>room.type.toLowerCase()===e.toLowerCase())
      setrooms(temprooms)
  
    }
  else{
    setrooms(duplicaterooms)

  }
 

  }
  return (
    <div className="container" >
      <div className="row mt-5 bs">
        <div className="col-md-4">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="search rooms" value={searchkey} onChange={(e) => {setsearchkey(e.target.value)}} onKeyUp={filterBySearch}/>
        </div>
        <div className="col-md-4">
        <select className="form-control" value={type}  onChange={(e) => {filterByType(e.target.value)}} >
          <option value="all">ALL</option>
          <option value="delux">Delux</option>
          <option value="non-delux">Non-Delux</option>
        </select>
        </div>
       
</div>
<div className="row-md-12justify-content-center ">
        {loading ? 
          (<Loader />
        ) :(
          rooms.map((room) => {
            return (
              <center>
                <div className="col-md-9 mt-5">
                  <Room room={room} fromdate={fromdate} todate={todate} />
                </div>
              </center>
            );
          })
        ) 
        }
      </div>
      </div>
    
  );
};
export default Homescreen;
