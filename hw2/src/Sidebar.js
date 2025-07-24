import React from 'react';

const shapes = [
  { type: 'circle', label: 'Circle' },
  { type: 'square', label: 'Square' },
  { type: 'triangle', label: 'Triangle' },
];

function ShapeIcon({ type, size = 20 }) {
  const half = size / 2;
  if (type === 'circle') {
    return <svg width={size} height={size}><circle cx={half} cy={half} r={half - 2} fill="#1976d2" /></svg>;
  } else if (type === 'square') {
    return <svg width={size} height={size}><rect x={2} y={2} width={size - 4} height={size - 4} fill="#43a047" /></svg>;
  } else if (type === 'triangle') {
    const points = [
      [half, 3],
      [3, size - 3],
      [size - 3, size - 3],
    ].map(p => p.join(",")).join(" ");
    return <svg width={size} height={size}><polygon points={points} fill="#fbc02d" /></svg>;
  }
  return null;
}

function Sidebar({ selectedShapeType, setSelectedShapeType }) {
  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('shape-type', type);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {shapes.map((shape) => (
        <button
          key={shape.type}
          draggable
          onDragStart={e => handleDragStart(e, shape.type)}
          onClick={() => setSelectedShapeType(shape.type)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 8px',
            fontWeight: selectedShapeType === shape.type ? 'bold' : 'normal',
            background: selectedShapeType === shape.type ? '#e0e0e0' : '#fff',
            border: '1px solid #bbb',
            borderRadius: 4,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          <ShapeIcon type={shape.type} />
          {shape.label}
        </button>
      ))}
      <button
        onClick={() => setSelectedShapeType(null)}
        style={{ marginTop: 16, background: '#eee', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer', padding: '6px 10px', fontSize: 13 }}
      >
        Deselect
      </button>
    </div>
  );
}

export default Sidebar; 