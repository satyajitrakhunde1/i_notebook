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
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxN2NmNWQ3MjVjYmE5YjQ0NTY5ZjkwIn0sImlhdCI6MTcxMjgzNjQ0NX0.5nhyCjLMKfTBXsDVJ5FQPsKudQElasicykUUTNOCfPE"
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
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxN2NmNWQ3MjVjYmE5YjQ0NTY5ZjkwIn0sImlhdCI6MTcxMjgzNjQ0NX0.5nhyCjLMKfTBXsDVJ5FQPsKudQElasicykUUTNOCfPE"
    }, 
    body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
  });


  //client add note logic
  console.log("adding a new note")
 const  note=  {
    "_id": "66196580f9913486954bfa61e9",
    "user": "6617cf5d725cba9b44569f90",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2024-04-12T16:46:56.052Z",
    "__v": 0
  }
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
      "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxN2NmNWQ3MjVjYmE5YjQ0NTY5ZjkwIn0sImlhdCI6MTcxMjgzNjQ0NX0.5nhyCjLMKfTBXsDVJ5FQPsKudQElasicykUUTNOCfPE"
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
  method: "POST", 
  headers: {
    "Content-Type": "application/json",
    "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjYxN2NmNWQ3MjVjYmE5YjQ0NTY5ZjkwIn0sImlhdCI6MTcxMjgzNjQ0NX0.5nhyCjLMKfTBXsDVJ5FQPsKudQElasicykUUTNOCfPE"
  }, 
  body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
});
const json = response.json();
console.log(json)


//----------------------------------------------------------------------

//Logic to edit the client
  for (let index = 0; index < notes.length; index++) {
    const element = notes[index];
    if(element._id=== id){
      element.title=title;
      element.description=description;
      element.tag=tag;
    }

  }
  
}


  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
