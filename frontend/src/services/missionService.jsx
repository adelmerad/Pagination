const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8010/api';

// One page of missions. The cursor is an opaque string from the API: we only pass it back.
export const fetchMissions = async (cursor = null) => {
  const url = cursor
    ? `${API_BASE_URL}/missions/?cursor=${encodeURIComponent(cursor)}`
    : `${API_BASE_URL}/missions/`;

  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error('Failed to load mission history. Please check your connection and try again.');
  }
  return response.json();
};
