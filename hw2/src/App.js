import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import ShapeCounter from './ShapeCounter';
import Auth from './Auth';
import DrawingSelector from './DrawingSelector';

function App() {
  const [title, setTitle] = useState('My Drawing');
  const [shapes, setShapes] = useState([]);
  const [selectedShapeType, setSelectedShapeType] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showDrawingSelector, setShowDrawingSelector] = useState(false);
  const [drawings, setDrawings] = useState([]);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setTitle('My Drawing');
    setShapes([]);
    setDrawings([]);
  };

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  const handleSelectDrawing = (drawing) => {
    setTitle(drawing.title || 'Untitled Drawing');
    setShapes(drawing.shapes || []);
    setShowDrawingSelector(false);
  };

  const handleCreateNewDrawing = () => {
    setTitle('New Drawing');
    setShapes([]);
    setShowDrawingSelector(false);
  };

  const handleShowDrawings = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/drawing/load/${currentUser}`);
      const data = await response.json();
      
      if (data.drawings) {
        setDrawings(data.drawings);
        setShowDrawingSelector(true);
      } else {
        alert('No drawings found. Create a new one!');
      }
    } catch (error) {
      console.error('Error loading drawings:', error);
      alert('Failed to load drawings');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ borderBottom: '1px solid #ccc', padding: '1rem' }}>
        <Header 
          title={title} 
          setTitle={setTitle} 
          shapes={shapes} 
          setShapes={setShapes}
          currentUser={currentUser}
          onLogout={handleLogout}
          onShowDrawings={handleShowDrawings}
        />
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ width: 120, borderRight: '1px solid #ccc', padding: '1rem 0' }}>
          <Sidebar selectedShapeType={selectedShapeType} setSelectedShapeType={setSelectedShapeType} />
        </div>
        <div style={{ flex: 1, position: 'relative', background: '#f9f9f9', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Canvas shapes={shapes} setShapes={setShapes} selectedShapeType={selectedShapeType} />
        </div>
      </div>
      <div style={{ borderTop: '1px solid #ccc', padding: '0.5rem 1rem' }}>
        <ShapeCounter shapes={shapes} />
      </div>
      
      {showDrawingSelector && (
        <DrawingSelector
          drawings={drawings}
          onSelectDrawing={handleSelectDrawing}
          onCreateNew={handleCreateNewDrawing}
        />
      )}
    </div>
  );
}

export default App;
