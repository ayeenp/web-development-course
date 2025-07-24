import React from 'react';

function getRandomId() {
  return Math.random().toString(36).slice(2) + Date.now();
}

const SHAPE_SIZE = 48;

function Canvas({ shapes, setShapes, selectedShapeType }) {
  const svgRef = React.useRef();

  // Place shape on click
  const handleCanvasClick = (e) => {
    if (!selectedShapeType) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setShapes([
      ...shapes,
      {
        id: getRandomId(),
        type: selectedShapeType,
        x: x,
        y: y,
      },
    ]);
  };

  // Remove shape on double-click
  const handleShapeDoubleClick = (id) => {
    setShapes(shapes.filter((s) => s.id !== id));
  };

  // Drag-and-drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('shape-type');
    if (!type) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setShapes([
      ...shapes,
      {
        id: getRandomId(),
        type,
        x,
        y,
      },
    ]);
  };

  // Render shape SVG
  const renderShape = (shape) => {
    const { id, type, x, y } = shape;
    const half = SHAPE_SIZE / 2;
    if (type === 'circle') {
      return (
        <circle
          key={id}
          cx={x}
          cy={y}
          r={half}
          fill="#1976d2"
          onDoubleClick={() => handleShapeDoubleClick(id)}
          style={{ cursor: 'pointer' }}
        />
      );
    } else if (type === 'square') {
      return (
        <rect
          key={id}
          x={x - half}
          y={y - half}
          width={SHAPE_SIZE}
          height={SHAPE_SIZE}
          fill="#43a047"
          onDoubleClick={() => handleShapeDoubleClick(id)}
          style={{ cursor: 'pointer' }}
        />
      );
    } else if (type === 'triangle') {
      const points = [
        [x, y - half],
        [x - half, y + half],
        [x + half, y + half],
      ]
        .map((p) => p.join(','))
        .join(' ');
      return (
        <polygon
          key={id}
          points={points}
          fill="#fbc02d"
          onDoubleClick={() => handleShapeDoubleClick(id)}
          style={{ cursor: 'pointer' }}
        />
      );
    }
    return null;
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      style={{ display: 'block', width: '100%', height: '100%', background: '#f9f9f9', minHeight: 0, overflow: 'hidden' }}
      onClick={handleCanvasClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {shapes.map(renderShape)}
    </svg>
  );
}

export default Canvas; 