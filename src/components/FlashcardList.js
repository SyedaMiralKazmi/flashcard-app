import React, { useState } from 'react';
import Flashcard from './Flashcard';
import FlashcardForm from './FlashcardForm';

const FlashcardList = ({ flashcards, updateFlashcard, deleteFlashcard }) => {
  const [editingIndex, setEditingIndex] = useState(null);

  const handleEdit = (index) => setEditingIndex(index);

  return (
    <div>
      {flashcards.map((card, index) =>
        editingIndex === index ? (
          <FlashcardForm
            key={index}
            index={index}
            initialData={card}
            updateFlashcard={updateFlashcard}
            setEditingIndex={setEditingIndex}
          />
        ) : (
          <Flashcard
            key={index}
            flashcard={card}
            index={index}
            onEdit={handleEdit}
            onDelete={deleteFlashcard}
          />
        )
      )}
    </div>
  );
};

export default FlashcardList;
