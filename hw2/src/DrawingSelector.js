import React from 'react';

function DrawingSelector({ drawings, onSelectDrawing, onCreateNew }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
          Select a Drawing
        </h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={onCreateNew}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '1rem'
            }}
          >
            Create New Drawing
          </button>
        </div>
        
        {drawings.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666' }}>
            No saved drawings found. Create your first drawing!
          </p>
        ) : (
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#555' }}>Your Drawings:</h3>
            {drawings.map((drawing, index) => (
              <div
                key={drawing.id || index}
                onClick={() => onSelectDrawing(drawing)}
                style={{
                  padding: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginBottom: '0.5rem',
                  cursor: 'pointer',
                  backgroundColor: '#f8f9fa',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#e9ecef'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f8f9fa'}
              >
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                  {drawing.title || 'Untitled Drawing'}
                </h4>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  {drawing.shapes ? `${drawing.shapes.length} shapes` : '0 shapes'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DrawingSelector; 