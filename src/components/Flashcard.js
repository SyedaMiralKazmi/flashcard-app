import React from 'react';

const Flashcard = ({ flashcard, index, onEdit, onDelete }) => (
  <div>
    <h3>Q: {flashcard.question}</h3>
    <p>A: {flashcard.answer}</p>
    <button onClick={() => onEdit(index)}>Edit</button>
    <button onClick={() => onDelete(index)}>Delete</button>
  </div>
);

export default Flashcard;
