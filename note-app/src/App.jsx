// React ve useState hook'u import edilir
import React, { useState } from 'react';
import './App.css';

const COLORS = ['#ea4c89','#c965df', '#f5d84c', '#4cc9f0', '#90e59a'];

function App() {
  const [note, setNote] = useState('');
  const [color, setColor] = useState('');
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  // Arama kutusundaki kelimeyi tutar

  // Not ekleme işlemi: boşsa eklemez, doluysa notu notes listesine ekler
  const handleAdd = ()=> {
    if (!note.trim() || !color) return; // Boş not ya da renk yoksa çık


    const newNote = {text: note, color}; // Yeni not nesnesi
    setNotes([newNote, ...notes]); // Yeni notu listenin en başına ekle
    setNote('');
    setColor('');
  };

  
  // Arama terimine göre filtrelenmiş notlar (büyük/küçük harf duyarsız)
  const filteredNotes = notes.filter((n) =>
    n.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <h1>NotesApp</h1>

      <input
        className='search-input'
        type='text'
        placeholder='Search...'
        value = {searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='note-card'>
        <textarea 
          placeholder='Enter your note here...'
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <div className='color-options'>
          {COLORS.map((c, i) => (
            <span
              key = {i}
              className={`color-circle ${color === c ? 'selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>

        <button className='add-button' onClick={handleAdd}>
          ADD
        </button>
      </div>

      <div className="note-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((n, i) => (
            <div key={i} className="note-box" style={{ backgroundColor: n.color }}>
              {n.text}
            </div>
          ))
        ) : (
          <p className="no-result">No matching note found.</p>
        )}
      </div>
    </div>
  );
}

export default App;