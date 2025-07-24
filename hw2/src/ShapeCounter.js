import React from 'react';

function ShapeCounter(props) {
  let counts = { circle: 0, square: 0, triangle: 0 };
  props.shapes.forEach(s => {
    if (counts[s.type] !== undefined) counts[s.type]++;
  });
  return (
    <div style={{ display: 'flex', gap: 24, fontWeight: 'bold', alignItems: 'center' }}>
      <span>
        <svg width={18} height={18} style={{ verticalAlign: 'middle' }}><circle cx={9} cy={9} r={7} fill="#1976d2" /></svg>
        Circle: {counts.circle}
      </span>
      <span>
        <svg width={18} height={18} style={{ verticalAlign: 'middle' }}><rect x={2} y={2} width={14} height={14} fill="#43a047" /></svg>
        Square: {counts.square}
      </span>
      <span>
        <svg width={18} height={18} style={{ verticalAlign: 'middle' }}><polygon points="9,3 3,15 15,15" fill="#fbc02d" /></svg>
        Triangle: {counts.triangle}
      </span>
    </div>
  );
}

export default ShapeCounter; 