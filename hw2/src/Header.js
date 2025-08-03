import React, { useRef, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

function Header({ title, setTitle, shapes, setShapes, currentUser, onLogout, onShowDrawings }) {
  const fileInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Export handler
  const handleExport = () => {
    const data = JSON.stringify({ title, shapes }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title || 'drawing'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import handler
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (
          typeof json.title === 'string' &&
          Array.isArray(json.shapes) &&
          json.shapes.every(
            (s) =>
              typeof s.id !== 'undefined' &&
              (s.type === 'circle' || s.type === 'square' || s.type === 'triangle') &&
              typeof s.x === 'number' &&
              typeof s.y === 'number'
          )
        ) {
          setTitle(json.title);
          setShapes(json.shapes);
        } else {
          alert('Invalid drawing JSON format.');
        }
      } catch {
        alert('Failed to parse JSON.');
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be re-imported
    e.target.value = '';
  };

  // Save to server
  const handleSave = async () => {
    if (!currentUser) {
      alert('Please login to save your drawing');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE_URL}/drawing/save`, {
        username: currentUser,
        title,
        shapes
      });

      setMessage('Drawing saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to save drawing');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Load from server
  const handleLoad = async () => {
    if (!currentUser) {
      alert('Please login to load your drawing');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.get(`${API_BASE_URL}/drawing/load/${currentUser}`);
      const drawings = response.data.drawings;
      
      // Show drawing selector
      if (drawings && drawings.length > 0) {
        // For now, just load the first drawing
        const drawing = drawings[0];
        setTitle(drawing.title);
        setShapes(drawing.shapes || []);
        setMessage('Drawing loaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('No drawings found. Create a new one!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to load drawing');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ fontSize: 20, fontWeight: 'bold', flex: 1, minWidth: 0 }}
        placeholder="Drawing Title"
      />
      
      {currentUser && (
        <>
          <button 
            onClick={handleSave}
            disabled={isLoading}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button 
            onClick={onShowDrawings}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            My Drawings
          </button>
        </>
      )}
      
      <button onClick={handleExport}>Export</button>
      <button onClick={() => fileInputRef.current.click()}>Import</button>
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImport}
      />
      
      {currentUser && (
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#666' }}>Welcome, {currentUser}!</span>
          <button 
            onClick={onLogout}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Logout
          </button>
        </div>
      )}
      
      {message && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '12px 20px',
          borderRadius: '4px',
          backgroundColor: message.includes('successfully') ? '#d4edda' : '#f8d7da',
          color: message.includes('successfully') ? '#155724' : '#721c24',
          border: `1px solid ${message.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`,
          zIndex: 1000
        }}>
          {message}
        </div>
      )}
    </div>
  );
}

export default Header; 