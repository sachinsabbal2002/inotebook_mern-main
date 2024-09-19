import React from "react";

const Footer = () => {
  return (
      <div className="container footer-bottom clearfix" style={{backgroundColor:'gray',maxWidth:"100vw", position:'fixed',left:'0',bottom:"0"}}>
        <div className="copyright" style={{textAlign:'center'}}>
          © Copyright{" "}
          <strong>
            <span>iNotebook</span>
          </strong>
          . All Rights Reserved
        </div>
      </div>
  );
};

export default Footer;
