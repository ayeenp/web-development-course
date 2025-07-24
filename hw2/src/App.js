import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Canvas from './Canvas';
import ShapeCounter from './ShapeCounter';

function App() {
  const [title, setTitle] = useState('My Drawing');
  const [shapes, setShapes] = useState([]);
  const [selectedShapeType, setSelectedShapeType] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ borderBottom: '1px solid #ccc', padding: '1rem' }}>
        <Header title={title} setTitle={setTitle} shapes={shapes} setShapes={setShapes} />
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
    </div>
  );
}

export default App;
