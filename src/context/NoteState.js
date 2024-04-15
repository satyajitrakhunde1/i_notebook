// NoteState.js
import { useState } from 'react';
import React   from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host ='http://localhost:5000'
  const notesInitial = []
  const [notes,setNotes]=useState(notesInitial)
   //--------------------------------------------------------------------------- 
//get all note
const getNotes =async()=>{
  //API call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    }, 
  });

const json =await response.json()
console.log(json)
setNotes(json)
  
}

//-------------------------------------------------------------------------------------
//add  a note
const addNote =async(title,description,tag)=>{
  //API call
  // eslint-disable-next-line
  const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    }, 
    body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
  });

  const note =await response.json()
  setNotes(notes.concat(note))
}
//---------------------------------------------------------------------------------------------
//Delete a note
//API CALL

const deleteNote =async(id)=>{
  
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE", 
    headers: {
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
    }
  });

  const json =await response.json()
  console.log(json)
  setNotes(json)

  console.log("Deleting the notew ith id " +id)
  const newNotes =notes.filter((note)=>{ return note._id!==id})
  setNotes(newNotes)
}


//----------------------------------------------------------------------------------------

//edit a  note
const editNote = async (id,title,description,tag)=>{
//API CALL
// Example POST method implementation:
const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  method: "PUT", 
  headers: {
    "Content-Type": "application/json",
    "auth-token":localStorage.getItem('token')
  }, 
  body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
});
const json = await response.json();
console.log(json)


//----------------------------------------------------------------------
let newNotes=JSON.parse(JSON.stringify(notes))
//Logic to edit the client
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id=== id){
      newNotes[index].title=title;
      newNotes[index].description=description;
      newNotes[index].tag=tag;
      break;
    }
  }
  setNotes(newNotes)
}


  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
