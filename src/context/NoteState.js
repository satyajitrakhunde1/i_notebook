// NoteState.js
import { useState } from 'react';
import React   from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const notesInitial = [
    
      {
        "_id": "6619656ef9913486954a61e6",
        "user": "6617cf5d725cba9b44569f90",
        "title": "my title",
        "description": "my description to add a not",
        "tag": "personal",
        "date": "2024-04-12T16:46:38.590Z",
        "__v": 0
      },
      {
        "_id": "66196580f9913bf486954a61e9",
        "user": "6617cf5d725cba9b44569f90",
        "title": "my title2 ",
        "description": "my description to add a not 2",
        "tag": "personal 2",
        "date": "2024-04-12T16:46:56.052Z",
        "__v": 0
      }
    ]
    
const [notes,setNotes]=useState(notesInitial)
//add  a note
const addNote =(title,description,tag)=>{
  //API call
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

//Delete a note
const deleteNote =(id)=>{
  console.log("Deleting the notewith id " +id)
  const newNotes =notes.filter((note)=>{ return note._id!==id})
  setNotes(newNotes)
}
//edit a  note
const editNote =()=>{
  
}


  return (
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
