const { useEffect } = require("react");
const { useLocation, Navigate } = require("react-router-dom");

//LOction hook return location of page 
//it return locatin
var location=useLocation(); 
// useeffect tab tab  run kar jaega jab iski depednecy array change hoga {location }
useEffect(()=>{
console.log(location);
},[location])
//USE HISTORY HOOK is update to navigated
// so instand of using historey hook we used navigated hook
// it return a object ,which store previous history so backtrack
var history=Navigate()
history('/')