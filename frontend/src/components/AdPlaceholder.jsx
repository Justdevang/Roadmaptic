import React from 'react';

export const AdPlaceholder = ({ type, style }) => {
  const adStyles = {
    'sticky-header': { width: '100%', height: '90px', maxWidth: '728px', margin: '0 auto' },
    'mobile-anchor': { width: '100%', height: '50px', position: 'fixed', bottom: 0, left: 0, zIndex: 1000 },
    'in-content': { width: '300px', height: '250px', margin: '32px auto' },
    'post-content': { width: '300px', height: '250px', margin: '40px auto' },
    'sidebar': { width: '300px', height: '600px' }
  };

  const currentStyle = adStyles[type] || {};

  return (
    <div 
      className="ad-placeholder-container"
      style={{
        ...currentStyle,
        ...style,
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px dashed rgba(255, 255, 255, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        overflow: 'hidden',
        color: 'var(--text-muted)',
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        pointerEvents: 'none',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div style={{ marginBottom: '4px', fontWeight: 'bold' }}>AdSense Placement</div>
      <div>{type} ({currentStyle.width}x{currentStyle.height})</div>
      <div style={{ marginTop: '8px', fontSize: '0.65rem', opacity: 0.5 }}>Revenue Optimization Active</div>
    </div>
  );
};
