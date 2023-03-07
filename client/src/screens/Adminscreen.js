import React,{useState,useEffect} from 'react';
import { Tabs } from 'antd';
import swal from "sweetalert";
import Loader from "../components/Loader";
import axios from "axios";
import Error from "../components/Error";
function Adminscreen() {

  
  useEffect(() => {
    if(!JSON.parse(localStorage.getItem('currentUser')).isAdmin)
    {
      window.location.href='/home'
    }
  
  }, []);

  return (
    <div className='mt-3 ml-3 bs' >
    <h2 className='text-center' style={{fontSize:'30px'}}><b>Admin Panel</b></h2>

      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Bookings",
            key: "1",
            children:<Bookings/>,
          },
          {
            label: "Rooms",
            key: "2",
            children:<Rooms/>,
          },
          {
            label: "Add Room",
            key: "3",
            children:<AddRoom/>,
          },
          {
            label: "Users",
            key: "4",
            children:<Users/>,
          },
        ]}
      />
    </div>
  )
}

export default Adminscreen

export function Bookings(){
  
  const [loading, setloading] = useState(false);
  const [bookings, setbookings] = useState();
  const [ error, seterror] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);

        const data = (await axios.get("/api/bookings/getallbookings")).data;
        setbookings(data)
        console.log(data);
        setloading(false);
        

        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);


  return(

    <div className='row'>
      <div className='col-md-10'>

        <h1>Bookings</h1>
        {loading &&(<Loader/>)}
     
        <table className='table table-bordered table-dark'>
          <thead className='bs thead-dark'><tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Room</th>
            <th>from</th>
            <th>to</th>
            <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {bookings && (bookings.map(booking=>{
          return<tr>
            <td>{booking._id}</td>
            <td>{booking.userid}</td>
            <td>{booking.room}</td>
            <td>{booking.fromdate}</td>
            <td>{booking.todate}</td>
            <td>{booking.status}</td>
          </tr>

        }))}

          </tbody>
        </table>
       
        
      </div>

    </div>
  )
}
export function Rooms(){
  
  const [loading, setloading] = useState(false);
  const [rooms, setrooms] = useState();
  const [error, seterror] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);

        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setrooms(data)
        console.log(data);
        setloading(false);
        

        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);


  return(

    <div className='row'>
      <div className='col-md-10'>

        <h1>Rooms</h1>
        {loading &&(<Loader/>)}
        
        <table className='table table-bordered table-dark'>
          <thead className='bs thead-dark'><tr>
            <th>Room ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Rent Per Day</th>
            <th>Max Count</th>
         
            </tr>
          </thead>
          <tbody>
          {rooms && (rooms.map(room=>{
          return<tr>
            <td>{room._id}</td>
            <td>{room.name}</td>
            <td>{room.type}</td>
            <td>{room.rentperday}</td>
            <td>{room.maxcount}</td>
            
          </tr>

        }))}

          </tbody>
        </table>
       
        
      </div>

    </div>
  )
}

  export function Users(){
  const [users, setusers] = useState();
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  useEffect(() => {

    const fetchData = async () => {
      try {
        setloading(true);

        const data = (await axios.get("/api/users/getallusers")).data;
        setusers(data)
        console.log(data);
        setloading(false);
        

        setloading(false);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
  }, []);

  return(
    <div className='row'>
      <div className='col-md-12'>
        <h1>Users</h1>
        {loading &&(<Loader/>)}

 
        <table className='table table-bordered table-dark'>
          <thead className='bs thead-dark'><tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
          
              
            </tr>
          </thead>
          <tbody>
          {users && (users.map(user=>{
          return<tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
         
            
          </tr>

        }))}

          </tbody>
        </table>

      </div>

    </div>
  )

}



export function AddRoom(){
  const[name,setname]=useState('')
  const[rentperday,setrentperday]=useState()
  const[facilities,setfacilities]=useState()
  const[maxcount,setmaxcount]=useState()
  const[description,setdescription]=useState()
  const[type,settype]=useState()
  const[imageurl1,setimageurl1]=useState()
  const[imageurl2,setimageurl2]=useState()
  const[imageurl3,setimageurl3]=useState()

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

  async function addroom(){
    const newroom={name,
      facilities,
      rentperday,
      maxcount,
      description,
      type,
      imageurls:[imageurl1,
      imageurl2,
      imageurl3]

    }
    try {
      setloading(true);

      const result = (await axios.post('/api/rooms/addroom',newroom)).data;
      // setusers(result)
      console.log(result);
      setloading(false);
      
      swal("Congrats", "Your Room Added Successfully", "success").then
        (result => {
          window.location.href='/home';
        }
      );
      
    } catch (error) {
      seterror(true);
      console.log(error);
      setloading(false);
      swal("Oops!", "Something went wrong", "error");
    }
  }
  return (
    <div className='row'>
      <div className='col-md-5'>
      {loading &&(<Loader/>)}
     
      <input type="text" className="form-control"placeholder="room name"value={name}onChange={(e) => {setname(e.target.value)}}/>
      <input type="text" className="form-control"placeholder="rent per day"value={rentperday}onChange={(e) => {setrentperday(e.target.value)}}/>
      <input type="text" className="form-control"placeholder="facilities"value={facilities}onChange={(e) => {setfacilities(e.target.value)}}/>
      <input type="text" className="form-control"placeholder="max count"value={maxcount}onChange={(e) => {setmaxcount(e.target.value)}}/>
     
      <input type="text" className="form-control"placeholder="description"value={description}onChange={(e) => {setdescription(e.target.value)}}/>
      
      </div>
      <div className='col-md-5'>
      <input type="text" className="form-control"placeholder="type"value={type} onChange={(e) => {settype(e.target.value)}}/>
      <input type="text" className="form-control"placeholder="image URL 1"value={imageurl1}onChange={(e) => {setimageurl1(e.target.value)}}/>
     
      <input type="text" className="form-control"placeholder="image URL 2"value={imageurl2}onChange={(e) => {setimageurl2(e.target.value)}}/>
     
      <input type="text" className="form-control"placeholder="image URL 3"value={imageurl3}onChange={(e) => {setimageurl3(e.target.value)}}/>
     
      <div className='text-right'>
        <button className='btn btn-primary mt-2' onClick={addroom}>Add Room</button>

      </div>
      </div>
      
    </div>
  )
}

