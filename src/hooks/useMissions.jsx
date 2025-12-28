import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchMissions } from '../services/missionService';

export const useMissions = () => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState(null);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  
  const isFetchingRef = useRef(false);

  const loadMissions = useCallback(async (currentCursor) => {
    if (isFetchingRef.current) return;
    
    isFetchingRef.current = true;
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchMissions(currentCursor);
      
      setMissions(prev => {
        const existingIds = new Set(prev.map(m => m.id));
        const newMissions = data.data.filter(m => !existingIds.has(m.id));
        return [...prev, ...newMissions];
      });
      
      setCursor(data.pagination.next_cursor);
      setHasMore(data.pagination.has_more);
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching missions:', err);
    } finally {
      setLoading(false);
      setInitialLoad(false);
      isFetchingRef.current = false;
    }
  }, []);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadMissions(cursor);
    }
  }, [hasMore, loading, cursor, loadMissions]);

  const retry = useCallback(() => {
    setError(null);
    loadMissions(cursor);
  }, [cursor, loadMissions]);

  useEffect(() => {
    loadMissions(null);
  }, [loadMissions]);

  return {
    missions,
    loading,
    hasMore,
    error,
    initialLoad,
    loadMore,
    retry
  };
};