import React, { useState, useContext } from 'react';
import noteContext from '../context/noteContext';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, "");
    setNote({ title: "", description: "" });
  };

  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const isDisabled =
    note.title.trim().length === 0 || note.description.trim().length === 0;

  return (
    <div className="container my-1">
      <h1>Add a Snippet</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={note.title}
            id="title"
            name="title"
            onChange={onchange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Code / Description</label>
          <textarea
            className="form-control"
            value={note.description}
            id="description"
            name="description"
            onChange={onchange}
            rows="8"
            style={{
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          disabled={isDisabled}
        >
          Add Snippet
        </button>
      </form>
    </div>
  );
};

export default AddNote;