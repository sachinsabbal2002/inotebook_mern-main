import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

 function Login (props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history =  useNavigate();
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle sumit is call ")

    const response = await fetch("https://inotebook-backend-ramashishs-projects.vercel.app/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "authtoken":"pasteauthtoken here"
      },
      // creadentail me ui se data ko fill kar liya gaya hai isliye ham body me email,password credential se le sakte hai
    //   body me data lene ka tarika
      body: JSON.stringify({
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
      props. user.setuser(json.mess)
      localStorage.setItem("token", json.authtoken);
      // history ab "/" route par chala jaega automatically (yani ki login karne ke baad home par chala jaega )
      // Navigate('/') both syntex is valid 
      history("/home");
      // props.alertshow.setalert({
      //   display:"inline",
      //   mess:"login successfully"
      // })
      alert("login success")
      // props.showAlert("create sucfuuly","success")
     
    } else {
       alert("Inavalid Cretentail retry")
       
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Login;