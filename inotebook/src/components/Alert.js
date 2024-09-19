import React from "react";
function Alert(props) {
  // const [alert,setalert]=useState({display:"",mess:""});
  return (

    <div className="container">
      <h1>{props.user.user}</h1>
    </div>
  )
}

export default Alert;
