import React,{useContext, useEffect,useRef,useState}  from 'react'
import noteContext from "../context/noteContext"
import Noteitems from './Noteitem';
import AddNote from './AddNote';


const Notes = () => {
    const context =useContext(noteContext);
    const {notes,getNotes,editNote} =context
useEffect(()=>{
  getNotes()
  // eslint-disable-next-line
},[])

const ref =useRef(null)
const closeref =useRef(null)
const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })

const updateNote=(currentNote) =>{
ref.current.click();
console.log("updating note")
setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
}



const handleClick = (e) => {
e.preventDefault()
editNote(note.id,note.etitle,note.edescription,note.etag)
ref.current.click();
}

const onchange = (e) => {
  setNote({ ...note, [e.target.name]: e.target.value })
}

  return (
    <>
    <AddNote/>
{/* //-----MODAL------------------ */}

<button ref={ref}    type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
    
      <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" value={note.etitle} placeholder="title" name='etitle' onChange={onchange} />
          </div>


          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="edescription" value={note.edescription} placeholder="Description" name='edescription' onChange={onchange} />
          </div>

          <div className="form-group my-3">
            <label htmlFor="tag">tag</label>
            <input type="text" className="form-control" id="etag" placeholder="tag" value={note.etag} name='etag' onChange={onchange} />
          </div>
      </form>




      </div>
      <div className="modal-footer">
        <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
    {/* //----------------------------- */}
    <div className="row px-4  mx-5">
<h2>Your Notes</h2>
<div className="container ">
{notes.length===0 && "No notes to display"}</div>
{notes.map((note)=>{
  return <Noteitems key={note._id} note={note} updateNote={updateNote}/>
})}
</div>
</>
  )
}

export default Notes
