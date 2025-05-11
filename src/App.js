import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useRef } from 'react';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const toast = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) return;

    const newCard = { question, answer };
    setFlashcards([...flashcards, newCard]);
    setQuestion('');
    setAnswer('');

    toast.current.show({ severity: 'success', summary: 'Added', detail: 'Flashcard created' });
  };
const colors = ['#fce4ec', '#e3f2fd', '#e8f5e9', '#fff3e0', '#EDE7F6', '#E8EAF6','#FFF59D','	#FCE4EC'];
  const handleEdit = (index) => {
    setEditIndex(index);
    setQuestion(flashcards[index].question);
    setAnswer(flashcards[index].answer);
    setEditDialogVisible(true);
  };

  const saveEditedCard = () => {
    const updatedCards = [...flashcards];
    updatedCards[editIndex] = { question, answer };
    setFlashcards(updatedCards);
    setEditDialogVisible(false);
    setQuestion('');
    setAnswer('');
    setEditIndex(null);
    toast.current.show({ severity: 'info', summary: 'Updated', detail: 'Flashcard updated' });
  };

  const confirmDelete = (index) => {
    confirmDialog({
      message: 'Are you sure you want to delete this flashcard?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleDelete(index),
    });
  };

  const handleDelete = (index) => {
    const newCards = flashcards.filter((_, i) => i !== index);
    setFlashcards(newCards);
    toast.current.show({ severity: 'warn', summary: 'Deleted', detail: 'Flashcard removed' });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: 'auto' }}>
      <Toast ref={toast} />
      <ConfirmDialog />

      <h2 style={{ textAlign: 'center', color: '#3f51b5' }}>
        <i className="pi pi-book" style={{ marginRight: '0.5rem', color: 'var(--cyan-600)' }}></i>
<span style={{ color: 'var(--cyan-500)' }}>EduLearn Flashcard Learning App</span>

      </h2>

      <Card title="Add New Flashcard" className="p-shadow-3" style={{ marginBottom: '2rem', backgroundColor: 'var(--green-100)',color: 'var(--green-800)' }}>
        <form onSubmit={handleSubmit}>
          <div className="p-fluid" style={{ marginBottom: '1rem' }}>
            <label htmlFor="question">Question</label>
            <InputText
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
            />
          </div>
          <div className="p-fluid" style={{ marginBottom: '1rem' }}>
            <label htmlFor="answer" style={{ marginLeft: '0.5rem' }}>Answer</label>
            <InputText
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the answer"
              autoResize
            />
          </div>
          <div style={{ marginLeft: '4.5rem' }}>
            <Button
              type="submit"
              label="Add Flashcard"
              icon="pi pi-plus"
              className="p-button-success"

            />
          </div>

        </form>
      </Card>

      <Divider />
      <h3>Review Flashcards</h3>



{flashcards.length === 0 ? (
  <p style={{ color: '#888' }}>No flashcards added yet.</p>
) : (
  flashcards.map((flashcard, index) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    return (
      <Card
  key={index}
  title={`Flashcard #${index + 1}`}
  className="p-shadow-2"
  style={{
    marginBottom: '1.5rem',
    backgroundColor: randomColor,
    borderLeft: '5px solid rgb(224, 224, 230)',
  }}
>
  <p style={{ marginBottom: '0.5rem' }}>{flashcard.question}</p>
  <strong style={{ display: 'block', marginBottom: '1rem' }}>{flashcard.answer}</strong>
  <div className="p-buttonset">
    <Button
      icon="pi pi-pencil"
      label="Edit"
      className="p-button-sm p-button-info"
      onClick={() => handleEdit(index)}
      style={{ marginRight: '0.5rem' }}
    />
    <Button
      icon="pi pi-trash"
      label="Delete"
      className="p-button-sm p-button-danger"
      onClick={() => confirmDelete(index)}
    />
  </div>
</Card>

    );
  })
)}

      

      {/* Edit Dialog */}
      <Dialog
        header="Edit Flashcard"
        visible={editDialogVisible}
        style={{ width: '400px' }}
        modal
        onHide={() => setEditDialogVisible(false)}
        footer={
          <div>
            <Button
              label="Cancel"
              icon="pi pi-times"
              onClick={() => setEditDialogVisible(false)}
              className="p-button-text"
            />
            <Button
              label="Save"
              icon="pi pi-check"
              onClick={saveEditedCard}
              autoFocus
            />
          </div>
        }
      >
        <div className="p-fluid">
          <label htmlFor="editQuestion">Question</label>
          <InputText
            id="editQuestion"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="p-fluid" style={{ marginTop: '1rem' }}>
          <label htmlFor="editAnswer">Answer</label>
          <InputTextarea
            id="editAnswer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={3}
            autoResize
          />
        </div>
      </Dialog>
    </div>
  );
}

export default App;
