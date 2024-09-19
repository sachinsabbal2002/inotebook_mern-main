import NoteContext from "./noteContext";
import { useState } from "react";
//THIS IS PROVIDER FILE FROM WHICH ALL DATA IS FETCH
//NoteState is a provider file in which all function ,filed are written which are acess any where and any time 
// write all function and variable here
const NoteState = (props) => {
  const host = "https://inotebook-backend-ramashishs-projects.vercel.app"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes from database using fetch()
  // fetch() return response , which have to convert into json formaate 
  // fetch() required async(key word)
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // taking authtoken from local storage
        "authtoken": localStorage.getItem('token')
      }
    });
    // fetch() return type convertd into json formate 
    const json = await response.json() 
     // note is set from featch() return type
    setNotes(json)
  }
  // Add a Note to the database using featch()
  // send data from body
  // here a function addNote( ) give data {titlte,description,tag} which is then provide to body and then to database
  const addNote = async (title, description, tag) => {
    // TODO:first call  API Call
    // API Call 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // here authtoken is come from localStorage
        "authtoken": localStorage.getItem('token')
      },
      // body take data from addNote function parameter and put it into database
      body: JSON.stringify({title, description, tag})
      //db me to url hi add kar diya 
      // db me note add hogaya 
    });
    const note = await response.json();// databse se sare  note ko featch ho raha hai
    // notes jo pahle se database me hai , note jo new create ho raha hai
    setNotes(notes.concat(note))// setNotes se notes, me , note ko add kar rahe hai UI ke liye 
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "authtoken": localStorage.getItem('token')
      }
    });
    // const json = response.json(); 
    console.log(response)
    const newNotes = notes.filter((note) => { return note._id !== id })// database me se note ko delelte kar raha hai aur bhir ,bach hua note ko notes me set kar rha hai
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "authtoken": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    // const json = await response.json(); 
    console.log(response)
     let newNotes = JSON.parse(JSON.stringify(notes))//newNotes variable me database ke  notes ko fetch () kar raha hai
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {// given id ko current id se match kar raha hai aur ,agar match hota hai tab edit kar raha hai 
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);// newNotes update ho gaya to setNotes() ki help se databse ke notes me update kar deta hua 
  }

  return (
    // this syntex to tranfer data in context 
    // <contextName.Provider value={{all varaible and function which want to transfer}}>{props.children}</contextName./Provider>
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;