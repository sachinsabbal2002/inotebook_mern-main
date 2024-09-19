const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
connectToMongo();
const app = express()
const port = 5000
app.use(cors())
const path = require("path");
app.use(express.json())
// // first url which to check the server by defalut this requst  through this url is 
app.use('/',(req,res)=>{
res.send("hello ramshish it is generated on get reqest of URl(loacalhost:5000/) ")
})
// // seond your to check route 
// app.get('/',(req,res)=>{
//   res.send("this shown whenever  your requst is / or deafult")
// })
// Available Routes ksi aur folder se rout ko lekar hit kar rah hua
// app.use(route,location) to hit rote from other file
app.use('/api/auth', require('./routes/auth'))// require(location of file where route is presnt)
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
