import React from 'react';

function ShapeIcon({ type, size = 18 }) {
  const half = size / 2;
  if (type === 'circle') {
    return <svg width={size} height={size} style={{ verticalAlign: 'middle' }}><circle cx={half} cy={half} r={half - 2} fill="#1976d2" /></svg>;
  } else if (type === 'square') {
    return <svg width={size} height={size} style={{ verticalAlign: 'middle' }}><rect x={2} y={2} width={size - 4} height={size - 4} fill="#43a047" /></svg>;
  } else if (type === 'triangle') {
    const points = [
      [half, 3],
      [3, size - 3],
      [size - 3, size - 3],
    ].map(p => p.join(",")).join(" ");
    return <svg width={size} height={size} style={{ verticalAlign: 'middle' }}><polygon points={points} fill="#fbc02d" /></svg>;
  }
  return null;
}

function ShapeCounter({ shapes }) {
  const counts = {
    circle: 0,
    square: 0,
    triangle: 0,
  };
  shapes.forEach((s) => {
    if (counts[s.type] !== undefined) counts[s.type]++;
  });
  return (
    <div style={{ display: 'flex', gap: 24, fontWeight: 'bold', alignItems: 'center' }}>
      <span><ShapeIcon type="circle" /> Circle: {counts.circle}</span>
      <span><ShapeIcon type="square" /> Square: {counts.square}</span>
      <span><ShapeIcon type="triangle" /> Triangle: {counts.triangle}</span>
    </div>
  );
}

export default ShapeCounter; 