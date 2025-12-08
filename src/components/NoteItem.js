import React, { useContext, useState } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'; 
import noteContext from '../context/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(note.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const MAX_LINES = 5;
  const lines = note.description.split("\n");
  const shortText = lines.slice(0, MAX_LINES).join("\n");
  const hasMore = lines.length > MAX_LINES;

  return (
    <div className='col-md-3 my-2'>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">

          <h3 style={{ color: "green" }} className="card-title">
            {note.title}
          </h3>

          {/* Code / Description */}
          <pre
            className="card-text mt-2"
            style={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              backgroundColor: '#f8f9fa',
              padding: '0.75rem',
              borderRadius: '4px',
              overflowX: 'auto',
              color: 'red',
              minHeight: '120px'
            }}
          >
{expanded ? note.description : shortText}
          </pre>

          {/* Read More / Show Less (right aligned) */}
          {hasMore && (
            <div style={{ textAlign: 'right', marginTop: '4px' }}>
              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#0d6efd',
                  padding: 0,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                {expanded ? "Show less..." : "Read more..."}
              </button>
            </div>
          )}

          {/* Bottom row: icons left, Copy right */}
          <div className="mt-2 d-flex justify-content-between align-items-center">
            <div>
              <i className='mx-2' style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => { deleteNote(note._id) }}
                />
              </i>
              <i className='mx-2' style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={() => { updateNote(note) }}
                />
              </i>
            </div>

            <button
              onClick={handleCopy}
              style={{
                background: copied ? '#198754' : '#0d6efd',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NoteItem;