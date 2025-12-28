import React, { useEffect, useRef } from 'react';
import { Scroll, Loader2, AlertCircle } from 'lucide-react';
import { useMissions } from '../../hooks/useMissions';
import MissionCard from './MissionCard';

const MissionLogsList = () => {
  const {
    missions,
    loading,
    hasMore,
    error,
    initialLoad,
    loadMore,
    retry
  } = useMissions();
  
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore, hasMore, loading]);

  return (
    <div className="mission-logs-container" style={{
      minHeight: '100vh',
      backgroundColor: '#f5f1e8',
      padding: '1.5rem',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='paper' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Crect width='100' height='100' fill='%23f5f1e8'/%3E%3Cpath d='M0 0L100 100M100 0L0 100' stroke='%23e8dfc8' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23paper)'/%3E%3C/svg%3E")`
    }}>
      {/* Ornate Header */}
      <div style={{maxWidth: '56rem', margin: '0 auto 2rem auto'}}>
        <div style={{
          position: 'relative',
          backgroundColor: '#f9f6ed',
          border: '4px solid black',
          borderRadius: '2px',
          padding: '2rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}>
          {/* Corner Decorations */}
          <div style={{position: 'absolute', top: 0, left: 0, width: '32px', height: '32px', borderTop: '4px solid black', borderLeft: '4px solid black', marginTop: '-4px', marginLeft: '-4px'}}></div>
          <div style={{position: 'absolute', top: 0, right: 0, width: '32px', height: '32px', borderTop: '4px solid black', borderRight: '4px solid black', marginTop: '-4px', marginRight: '-4px'}}></div>
          <div style={{position: 'absolute', bottom: 0, left: 0, width: '32px', height: '32px', borderBottom: '4px solid black', borderLeft: '4px solid black', marginBottom: '-4px', marginLeft: '-4px'}}></div>
          <div style={{position: 'absolute', bottom: 0, right: 0, width: '32px', height: '32px', borderBottom: '4px solid black', borderRight: '4px solid black', marginBottom: '-4px', marginRight: '-4px'}}></div>
          
          {/* Decorative Flourish */}
          <div style={{textAlign: 'center', marginBottom: '1rem'}}>
            <span style={{fontSize: '1.5rem'}}>✦ ══════════ ✦</span>
          </div>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '0.5rem',
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.1em',
            color: 'black'
          }}>
            MISSION HISTORY
          </h1>
          
          <p style={{
            textAlign: 'center',
            fontSize: '1.125rem',
            color: '#4a5568',
            fontFamily: 'Georgia, serif'
          }}>
            Chronicle of Your Journey Through Time
          </p>
          
          {/* Decorative Flourish */}
          <div style={{textAlign: 'center', marginTop: '1rem'}}>
            <span style={{fontSize: '1.5rem'}}>✦ ══════════ ✦</span>
          </div>
        </div>
      </div>

      {/* Mission Cards List */}
      <div style={{maxWidth: '56rem', margin: '0 auto'}}>
        {initialLoad && loading && (
          <div style={{
            backgroundColor: '#f9f6ed',
            border: '3px solid black',
            borderRadius: '2px',
            padding: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            marginBottom: '1.5rem'
          }}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Loader2 style={{width: '2rem', height: '2rem', animation: 'spin 1s linear infinite', marginRight: '0.75rem'}} />
              <span style={{fontSize: '1.25rem', fontFamily: 'Georgia, serif'}}>
                Loading Historical Records...
              </span>
            </div>
          </div>
        )}

        {missions.map((mission, index) => (
          <MissionCard key={`${mission.id}-${index}`} mission={mission} />
        ))}

        {!initialLoad && loading && (
          <div style={{
            backgroundColor: '#f9f6ed',
            border: '3px solid black',
            borderRadius: '2px',
            padding: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            marginBottom: '1.5rem'
          }}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Loader2 style={{width: '2rem', height: '2rem', animation: 'spin 1s linear infinite', marginRight: '0.75rem'}} />
              <span style={{fontSize: '1.25rem', fontFamily: 'Georgia, serif'}}>
                Loading More Records...
              </span>
            </div>
          </div>
        )}

        {error && (
          <div style={{
            backgroundColor: '#fef3cd',
            border: '3px solid #8b4513',
            borderRadius: '2px',
            padding: '1.5rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            marginBottom: '1.5rem'
          }}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                <AlertCircle style={{width: '1.5rem', height: '1.5rem', color: '#8b4513'}} />
                <span style={{fontSize: '1.125rem', color: '#8b4513', fontFamily: 'Georgia, serif'}}>
                  {error}
                </span>
              </div>
              <button
                onClick={retry}
                style={{
                  backgroundColor: '#8b4513',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  border: '2px solid black',
                  fontWeight: 'bold',
                  fontFamily: 'Georgia, serif',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#654321'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8b4513'}
              >
                RETRY
              </button>
            </div>
          </div>
        )}

        {!hasMore && !loading && missions.length > 0 && (
          <div style={{
            backgroundColor: '#f9f6ed',
            border: '3px solid black',
            borderRadius: '2px',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{fontSize: '1.875rem', marginBottom: '0.75rem'}}>✦ ══════════ ✦</div>
            <p style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', fontFamily: 'Georgia, serif'}}>
              END OF RECORDS
            </p>
            <p style={{fontSize: '1.125rem', color: '#4a5568', fontFamily: 'Georgia, serif'}}>
              You have reviewed all historical entries
            </p>
            <div style={{fontSize: '1.875rem', marginTop: '0.75rem'}}>✦ ══════════ ✦</div>
          </div>
        )}

        {!loading && missions.length === 0 && !error && (
          <div style={{
            backgroundColor: '#f9f6ed',
            border: '3px solid black',
            borderRadius: '2px',
            padding: '3rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>
            <Scroll style={{width: '6rem', height: '6rem', margin: '0 auto 1.5rem auto', color: '#9ca3af'}} />
            <p style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.75rem', fontFamily: 'Georgia, serif'}}>
              NO RECORDS FOUND
            </p>
            <p style={{fontSize: '1.125rem', color: '#4a5568', fontFamily: 'Georgia, serif'}}>
              Begin your journey through the rifts of time
            </p>
          </div>
        )}

        <div ref={observerTarget} style={{height: '1rem'}} />
      </div>
    </div>
  );
};

export default MissionLogsList;