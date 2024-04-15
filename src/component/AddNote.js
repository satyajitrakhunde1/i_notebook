import React, { useContext, useState } from 'react'
import noteContext from "../context/noteContext"


const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context

  const [note, setNote] = useState({ title: "", description: "", tag: "Personal" })

  const handleClick = (e) => {
 e.preventDefault()
    addNote(note.title,note.description,note.tag)
    setNote({ title: "", description: "", tag: "" })
    props.showAlert("Added successfully","success")
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
      <div className="container my-5 mx-5 px-5" >
        <h2>Add a note</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" value={note.title} placeholder="title" name='title' onChange={onchange} />
          </div>


          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" value={note.description} placeholder="Description" name='description' onChange={onchange} />
          </div>

          <div className="form-group my-3">
            <label htmlFor="tag">tag</label>
            <input type="text" className="form-control" id="tag" value={note.tag} placeholder="tag" name='tag' onChange={onchange} />
          </div>


          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-4" onClick={handleClick} >Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
