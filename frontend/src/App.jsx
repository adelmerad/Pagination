import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MissionHistoryPage from './pages/MissionHistoryPage';

function App() {
  const styles = {
    nav: {
      backgroundColor: 'black',
      color: 'white',
      padding: '1rem',
      borderBottom: '4px solid #d4af37'
    },
    navContainer: {
      maxWidth: '72rem',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      fontFamily: 'Georgia, serif',
      color: 'white'
    },
    navLink: {
      fontFamily: 'Georgia, serif',
      textDecoration: 'none',
      color: 'white',
      margin: '0 1.5rem',
      transition: 'color 0.3s'
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* Navigation Bar */}
        <nav style={styles.nav}>
          <div style={styles.navContainer}>
            <Link to="/" style={styles.logo}>
              RIFTERS
            </Link>
            
            <div>
              <Link 
                to="/" 
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = '#d4af37'}
                onMouseOut={(e) => e.target.style.color = 'white'}
              >
                HOME
              </Link>
              <Link 
                to="/mission-history" 
                style={styles.navLink}
                onMouseOver={(e) => e.target.style.color = '#d4af37'}
                onMouseOut={(e) => e.target.style.color = 'white'}
              >
                MISSION HISTORY
              </Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mission-history" element={<MissionHistoryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Home Page Component
const HomePage = () => {
  const homeStyles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f1e8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    content: {
      textAlign: 'center'
    },
    title: {
      fontSize: '3.75rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      fontFamily: 'Georgia, serif'
    },
    subtitle: {
      fontSize: '1.25rem',
      marginBottom: '2rem',
      fontFamily: 'Georgia, serif'
    },
    button: {
      backgroundColor: 'black',
      color: 'white',
      padding: '1rem 2rem',
      border: '4px solid #d4af37',
      fontWeight: 'bold',
      fontSize: '1.25rem',
      fontFamily: 'Georgia, serif',
      cursor: 'pointer',
      transition: 'all 0.3s',
      textDecoration: 'none',
      display: 'inline-block'
    }
  };

  return (
    <div style={homeStyles.container}>
      <div style={homeStyles.content}>
        <h1 style={homeStyles.title}>RIFTERS</h1>
        <p style={homeStyles.subtitle}>Journey Through Algerian History</p>
        <Link 
          to="/mission-history"
          style={homeStyles.button}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#d4af37';
            e.target.style.color = 'black';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'black';
            e.target.style.color = 'white';
          }}
        >
          VIEW MISSION HISTORY
        </Link>
      </div>
    </div>
  );
};

export default App;