const API_BASE_URL = 'http://localhost:8010/api';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMissions = async (cursor = null, limit = 3) => {
  try {
    const url = cursor 
      ? `${API_BASE_URL}/missions/?cursor=${encodeURIComponent(cursor)}`
      : `${API_BASE_URL}/missions/`;
    
    console.log('🔄 Fetching missions from:', url);
    
    await delay(800);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Received data:', data);
    
    return data;
    
  } catch (error) {
    console.error('❌ Error fetching missions:', error);
    throw new Error('Failed to load mission history. Please check your connection and try again.');
  }
};
