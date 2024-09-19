
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import NoteState from './context/NoteState';

import Login from './components/Login'
import Signup from './components/Singup';
import Alert from "./components/Alert";
import {  useState } from "react";
import Inotebook from "./components/Inotebook";
import Footer from "./components/Footer";

function App() { 
const [user,setuser]=useState()
  return (
    <>
    {/* NoteState is cotext provider so we make its wraper ,so can other componet acces the data from context */}
      <NoteState>
        <Router>
          <Navbar user={{user,setuser}}/> 
          <Alert  user={{user,setuser}}/> 
          <div className="container">
            <Routes >
            <Route exact path="/" element={<Inotebook />}></Route>
              <Route exact path="/home" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}> </Route>
              <Route exact path="/login" element={<Login  user={{user,setuser}}/>}>  </Route>
              <Route exact path="/signup" element={<Signup  />}>  </Route>
            </Routes>
          </div>
        </Router>
        <Footer/>
      </NoteState>
    </>
  );
}

export default App;
