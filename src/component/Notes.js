import React,{useContext}  from 'react'
import noteContext from "../context/noteContext"
import Noteitems from './Noteitem';


const Notes = () => {
    const context =useContext(noteContext);
    const {notes,setNotes} =context
  return (
    <div className="row px-1">
<h2>Your Notes</h2>
{notes.map((note)=>{
  return <Noteitems key={note._id} note={note}/>
})}
</div>
  )
}

export default Notes
