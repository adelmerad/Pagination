import React from 'react';

const MissionCard = ({ mission }) => {
  const eraStyles = {
    'Ancient': { bg: '#d4af37', border: '#8b7355', label: 'ANCIENT ERA' },
    'Medieval': { bg: '#c19a6b', border: '#654321', label: 'MEDIEVAL ERA' },
    'Colonial': { bg: '#b8860b', border: '#8b4513', label: 'COLONIAL ERA' },
    'Modern': { bg: '#daa520', border: '#996515', label: 'MODERN ERA' },
    'Independence': { bg: '#cd853f', border: '#8b4726', label: 'INDEPENDENCE ERA' }
  };

  const style = eraStyles[mission.era] || eraStyles['Ancient'];

  return (
    <div 
      className="mission-card"
      style={{
        position: 'relative',
        border: '4px solid black',
        borderRadius: '2px',
        padding: '1.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
        backgroundColor: style.bg,
        marginBottom: '1.5rem'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
      }}
    >
      <div style={{position: 'absolute', top: 0, left: 0, width: '24px', height: '24px', borderTop: '4px solid black', borderLeft: '4px solid black', marginTop: '-4px', marginLeft: '-4px'}}></div>
      <div style={{position: 'absolute', top: 0, right: 0, width: '24px', height: '24px', borderTop: '4px solid black', borderRight: '4px solid black', marginTop: '-4px', marginRight: '-4px'}}></div>
      <div style={{position: 'absolute', bottom: 0, left: 0, width: '24px', height: '24px', borderBottom: '4px solid black', borderLeft: '4px solid black', marginBottom: '-4px', marginLeft: '-4px'}}></div>
      <div style={{position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderBottom: '4px solid black', borderRight: '4px solid black', marginBottom: '-4px', marginRight: '-4px'}}></div>

      <div style={{marginBottom: '1rem'}}>
        <div 
          style={{
            display: 'inline-block',
            padding: '0.25rem 1rem',
            border: '2px solid black',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            fontFamily: 'Georgia, serif',
            backgroundColor: style.border,
            color: 'white'
          }}
        >
          {style.label}
        </div>
      </div>

      <h3 
        style={{
          fontSize: '1.875rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.05em',
          color: 'black'
        }}
      >
        {mission.mission_name}
      </h3>

      <div style={{borderTop: '2px solid black', margin: '1rem 0', opacity: 0.5}}></div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', color: 'black'}}>
        <div>
          <p style={{fontWeight: 'bold', marginBottom: '0.25rem', fontFamily: 'Georgia, serif'}}>
            Date Completed:
          </p>
          <p style={{fontFamily: 'Georgia, serif'}}>
            {new Date(mission.visited_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        
        <div>
          <p style={{fontWeight: 'bold', marginBottom: '0.25rem', fontFamily: 'Georgia, serif'}}>
            Time:
          </p>
          <p style={{fontFamily: 'Georgia, serif'}}>
            {new Date(mission.visited_at).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        
        <div>
          <p style={{fontWeight: 'bold', marginBottom: '0.25rem', fontFamily: 'Georgia, serif'}}>
            Location:
          </p>
          <p style={{fontFamily: 'Georgia, serif'}}>📍 {mission.location}</p>
        </div>
        
        <div>
          <p style={{fontWeight: 'bold', marginBottom: '0.25rem', fontFamily: 'Georgia, serif'}}>
            Progress:
          </p>
          <p style={{fontFamily: 'Georgia, serif'}}>⭐ {mission.progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
