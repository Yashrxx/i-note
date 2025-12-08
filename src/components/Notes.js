import React, { useEffect, useRef, useState, useContext } from 'react'
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, GetNotes, editnote } = context;
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            GetNotes();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    // Removed tag from UI; keeping just id, title, description
    const [note, setNote] = useState({ id: "", U_title: "", U_description: "" });

    const ref = useRef(null);
    const refClose = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        console.log("Updated a Note", note);

        // If your editnote still expects a 4th param (tag),
        // you can pass an empty string "" or handle it inside context.
        editnote(note.id, note.U_title, note.U_description, "");

        refClose.current.click();
    }

    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            U_title: currentNote.title || "",
            U_description: currentNote.description || ""
        });
    }

    return (
        <>
            {/* Hidden button to trigger Bootstrap modal */}
            <button
                type="button"
                ref={ref}
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Launch demo modal
            </button>

            {/* Edit Note Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Snippet</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="U_title" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        value={note.U_title}
                                        className="form-control"
                                        id="U_title"
                                        name="U_title"
                                        onChange={onchange}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="U_description" className="form-label">Code / Description</label>
                                    {/* textarea instead of input, resizable by default */}
                                    <textarea
                                        value={note.U_description}
                                        className="form-control"
                                        id="U_description"
                                        name="U_description"
                                        onChange={onchange}
                                        rows="10"
                                        // Monospace + preserve formatting feel
                                        style={{
                                            fontFamily: 'monospace',
                                            fontSize: '0.9rem'
                                        }}
                                    />
                                    <div className="form-text">
                                        Paste your code here. New lines will be preserved.
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                ref={refClose}
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={handleClick}
                                className="btn btn-primary"
                                disabled={note.U_title.trim().length === 0 || note.U_description.trim().length === 0}
                            >
                                Update Snippet
                            </button>

                        </div>
                    </div>
                </div>
            </div>

            {/* AddNote should also use a <textarea> for description for the same reason */}
            <AddNote />

            <div className='row my-3'>
                <h2>Your Snippets</h2>
                <div className="container mx-3">
                    {notes.length === 0 && "No snippets to display"}
                </div>
                {notes.map((note) => {
                    return (
                        <NoteItem
                            key={note._id}
                            updateNote={updateNote}
                            note={note}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default Notes;