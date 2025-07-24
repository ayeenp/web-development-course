import React from 'react';

const shapes = [
  { type: 'circle', label: 'Circle' },
  { type: 'square', label: 'Square' },
  { type: 'triangle', label: 'Triangle' },
];

function Sidebar(props) {
  function handleDragStart(e, type) {
    e.dataTransfer.setData('shape-type', type);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {shapes.map((shape) => (
        <button
          key={shape.type}
          draggable
          onDragStart={e => handleDragStart(e, shape.type)}
          onClick={() => props.setSelectedShapeType(shape.type)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 8px',
            fontWeight: props.selectedShapeType === shape.type ? 'bold' : 'normal',
            background: props.selectedShapeType === shape.type ? '#e0e0e0' : '#fff',
            border: '1px solid #bbb',
            borderRadius: 4,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {shape.type === 'circle' && (
            <svg width={20} height={20}><circle cx={10} cy={10} r={8} fill="#1976d2" /></svg>
          )}
          {shape.type === 'square' && (
            <svg width={20} height={20}><rect x={2} y={2} width={16} height={16} fill="#43a047" /></svg>
          )}
          {shape.type === 'triangle' && (
            <svg width={20} height={20}><polygon points="10,3 3,17 17,17" fill="#fbc02d" /></svg>
          )}
          {shape.label}
        </button>
      ))}
      <button
        onClick={() => props.setSelectedShapeType(null)}
        style={{ marginTop: 16, background: '#eee', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer', padding: '6px 10px', fontSize: 13 }}
      >
        Deselect
      </button>
    </div>
  );
}

export default Sidebar; 