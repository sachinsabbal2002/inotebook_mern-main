import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {

    const [credentials, setCredentials] = useState({name:"" ,email: "", password: "" ,cpassword:""});
    var navigate=useNavigate();
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handle sumit is call ")
        const response = await fetch("https://inotebook-backend-xi.vercel.app/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "authtoken":"pasteauthtoken here"
          },
          // creadentail me ui se data ko fill kar liya gaya hai isliye ham body me email,password credential se le sakte hai
        //   body me data lene ka tarika
          body: JSON.stringify({
            name:credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        });
        // fetch() se jo respone mila hai use json me convert karta hau 
        const json = await response.json();
        console.log(json);
        if (json.success) {
          // Save the authtoken in localStroge
          // setItem is predefine function
          localStorage.setItem("token", json.authtoken);
          // history ab "/" route par chala jaega automatically (yani ki login karne ke baad home par chala jaega )
          navigate('/') 
        //   props.showAlert("sucessfully ","success")
        //   history("/");both syntex is valid 
        } else {
            // props.showAlert("invalide credential","denger")
            alert("email already exist")
        }
      };
   return(
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={credentials.name}
            onChange={onChange}
            name="name"
            id="name"
          />
        </div>
      <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
           Confirm Password
          </label>
          <input
            type="cpassword"
            className="form-control"
            value={credentials.cpassword}
            onChange={onChange}
            name="cpassword"
            id="cpassword"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
