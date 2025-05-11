import React, { useState } from 'react';

const FlashcardForm = ({ addFlashcard, updateFlashcard, index, initialData = {}, setEditingIndex }) => {
  const [question, setQuestion] = useState(initialData.question || '');
  const [answer, setAnswer] = useState(initialData.answer || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const flashcard = { question, answer };

    if (updateFlashcard) {
      updateFlashcard(index, flashcard);
      setEditingIndex(null);
    } else {
      addFlashcard(flashcard);
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />
      <textarea
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      <button type="submit">{updateFlashcard ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default FlashcardForm;
