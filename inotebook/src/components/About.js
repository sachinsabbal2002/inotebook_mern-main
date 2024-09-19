import React from "react";
import Redux from "./Redux/Redux";
import img1 from "./images/inotebook1.jpg";
import img2 from "./images/inotebook2.jpg";

const About = () => {
  return (
    <div>
      <main id="main">
        {/* <!-- ======= About Us Section ======= --> */}
        <section id="about" className="about">
          {/* <div className="container aos-init aos-animate" data-aos="fade-up"> */}
          <div>
            <div className="section-title">
              <h2>About Us</h2>
            </div>
            <div className="content" >
              <p style={{fontSize:'2rem'}}>
                Welcome to our note-taking website, where you can easily create,
                read, update, and delete notes. Our user-friendly interface
                makes it simple to organize and manage your notes. We take
                security and privacy seriously, your notes are always kept safe
                with advanced encryption techniques. If you have any questions
                or concerns, please don't hesitate to contact us.
              </p>
              {/* <a href="#" className="btn-learn-">Learn More</a> */}
            </div>

            <div className="points" >
              <ul style={{fontSize:'2.2rem', color:'purple'}}>
                <li>
                  <i className="ri-check-double-line"></i> Safe and Accessible:
                  Store notes securely and access them from any device with an
                  internet connection.
                </li>
                <li>
                  <i className="ri-check-double-line"></i> Organized Notes: Keep
                  notes organized with folders, tags, and categories, and easily
                  search for specific information.
                </li>
                <li>
                  <i className="ri-check-double-line"></i> Advanced Encryption:
                  iNotebook uses advanced encryption techniques to protect
                  sensitive information both in transit and at rest.
                </li>
              </ul>
              {/* <!-- <a href="#" className="btn-learn-more">Learn More</a> --> */}
            </div>
          </div>
        </section>
        {/* <!-- End About Us Section --> */}

        {/* <!-- ======= Skills Section ======= --> */}
        <br></br>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          <div>
            <img
              src={img1} className="img-fluid"
              style={{
                border: "solid green 15px",
               
                borderRadius: "10px",
              }}
              alt=""
            />
          </div>
          <div>
            <img className="img-fluid"
              src={img2}
              style={{
                border: "solid gray 15px",
                
                borderRadius: "10px",
              }}
              alt=""
            />
          </div>
        </div>
        {/* <!-- End Skills Section --> */}
      </main>
    </div>
  );
};

export default About;
