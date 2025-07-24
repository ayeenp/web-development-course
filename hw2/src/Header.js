import React, { useRef } from 'react';

function Header({ title, setTitle, shapes, setShapes }) {
  const fileInputRef = useRef();

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

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ fontSize: 20, fontWeight: 'bold', flex: 1, minWidth: 0 }}
        placeholder="Drawing Title"
      />
      <button onClick={handleExport}>Export</button>
      <button onClick={() => fileInputRef.current.click()}>Import</button>
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImport}
      />
    </div>
  );
}

export default Header; 