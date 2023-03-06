import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import {Link} from "react-router-dom";

const Loginscreen = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState();

 

  const login = async () => {
    const user = {
      email,
      password,
    };
    try {
      setloading(true);
 
      const result = (await axios.post("/api/users/login", user)).data;
      // console.log(result);

      setloading(false);

      localStorage.setItem("currentUser", JSON.stringify(result));

      window.location.href='/home'
    } catch (err) {
      console.log(err);
      setloading(false);
      seterror(true);
    }
  };
  return (
    <div>
      {loading && <Loader />}
      {!loading && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-6  mt-5">
            {error && <Error message="Invalid Credentials" />}
            <div className="bs">
              <h2>Login</h2>
              <form>
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                /><br/>

                <input
                  type="text"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />

                <button className="btn btn-primary mt-3" onClick={login}>
                  Login
                </button>
                
                <div>
                  Don't have an account? <Link to ="/register"> Register</Link>
                  
                  </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loginscreen;
