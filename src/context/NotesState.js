import React, { useState } from "react";
import noteContext from "./noteContext";
const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);
  //add a note
  const addNote = async (title, description, tag) => {
    // console.log("Adding a new note")
    //ApI call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    })
    const note = await response.json();
    // localStorage.setItem('token', note.authtoken);
    setNotes(notes.concat(note))
  }
  //Get all notes
  const GetNotes = async () => {
    //ApI call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })  
    const json = await response.json();
    console.log(json)
    setNotes(json)
  }
  //update a note
  const editnote = async (id, title, description, tag) => {
    //ApI call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'auth-token':  localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    })
    const json = response.json();
    localStorage.setItem('token', json.authtoken);
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit
    for (let i = 0; i < notes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag
        break;
      }
    }
    setNotes(newNotes)
  }
  //delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'auth-token':  localStorage.getItem("token")
      }
    })
    console.log('note deleted successfully')
    const json = await response.json();
    localStorage.setItem('token', json.authtoken);
    console.log(json)
    setNotes(json)
    // console.log("Deleting the Note with id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editnote, GetNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZmNzg2OThjMjg2MjBkOGM1NjZlNWQ3In0sImlhdCI6MTcyNzU0NzEwNn0.ccyHyBK4QWPsIbL7071aZDoycsr5TjE8TqhRBRabPo0'