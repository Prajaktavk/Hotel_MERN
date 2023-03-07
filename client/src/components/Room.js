
import React,{useState} from "react";
import {Modal,Button,Carousel} from "react-bootstrap";
import {Link} from 'react-router-dom';
const Room = ({room,fromdate,todate}) => {
  const [show, setShow] = useState(false);
  console.log(fromdate,todate)
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

console.log(room)
  return (
    <div className="row bs">
      {/* mt :margin top */}
     
        <div className="col-md-6">
          <img src={room.imageurls[0]} width="400px"  height="300" alt="image pictures"/>
        </div>
        <div className="col-md-5">
          <h5>  {room.name}</h5>
          <b>
          <p>Facilities: {room.facilities}</p>
          <p className="pra">Max Count: {room.maxcount}</p>
          <p>Type: {room.type}</p>
          </b> 
        
          <div style={{ float: "right" }}>
           
            {(fromdate && todate) && (
               <Link to={`/book/${room._id}/${fromdate}/${todate}`}>
               <button className="btn btn-primary bt2 ">Book Now</button>
               </Link>
            ) }
           
            <button className="btn btn-primary bt3" onClick={handleShow}>View Details</button>
          </div>

        </div>
        

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Carousel>
     
      
     {room.imageurls.map(url=>{
      return  <Carousel.Item>
      <img
        className="d-block w-100 bigimg"
        src={url}
     alt="image details"
      />

    </Carousel.Item>
     })}
    </Carousel>
    <p>{room.description}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>


      </div>
    
  
  );
};

export default Room;
