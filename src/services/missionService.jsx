// Mock mission data
const mockMissions = [
  {
    id: 1,
    mission_name: "Roman Ruins of Djemila",
    era: "Ancient",
    location: "  Djemila, Setif Province",
    visited_at: "2024-01-15T10:30:00Z",
    progress: 100
  },
  {
    id: 2,
    mission_name: "The Casbah of Algiers",
    era: "Medieval",
    location: "  Algiers Old City",
    visited_at: "2024-01-20T14:45:00Z",
    progress: 85
  },
  {
    id: 3,
    mission_name: "French Quarter of Oran",
    era: "Colonial",
    location: "  Oran City Center",
    visited_at: "2024-02-05T09:15:00Z",
    progress: 70
  },
  {
    id: 4,
    mission_name: "Martyrs' Memorial",
    era: "Independence",
    location: "  Algiers",
    visited_at: "2024-02-10T16:20:00Z",
    progress: 95
  },
  {
    id: 5,
    mission_name: "Great Mosque of Algiers",
    era: "Modern",
    location: "  Algiers Bay",
    visited_at: "2024-02-15T11:00:00Z",
    progress: 60
  },
  {
    id: 6,
    mission_name: "Tassili n'Ajjer Rock Art",
    era: "Ancient",
    location: "  Sahara Desert",
    visited_at: "2024-02-20T13:30:00Z",
    progress: 80
  },
  {
    id: 7,
    mission_name: "Tlemcen Grand Mosque",
    era: "Medieval",
    location: "  Tlemcen",
    visited_at: "2024-02-25T15:45:00Z",
    progress: 90
  },
  {
    id: 8,
    mission_name: "National Museum of Mujahid",
    era: "Independence",
    location: " Algiers",
    visited_at: "2024-03-01T10:00:00Z",
    progress: 100
  },
  {
    id: 9,
    mission_name: "Tipasa Archaeological Park",
    era: "Ancient",
    location: " Tipasa",
    visited_at: "2024-03-05T12:00:00Z",
    progress: 75
  },
  {
    id: 10,
    mission_name: "Hassan Pasha Palace",
    era: "Medieval",
    location: " Oran",
    visited_at: "2024-03-10T14:15:00Z",
    progress: 88
  }
];

// Fetch missions with pagination
export const fetchMissions = async (cursor = null, limit = 3) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const startIndex = cursor ? parseInt(cursor) : 0;
  const endIndex = startIndex + limit;
  const data = mockMissions.slice(startIndex, endIndex);
  
  const hasMore = endIndex < mockMissions.length;
  const nextCursor = hasMore ? endIndex.toString() : null;
  
  return {
    data,
    pagination: {
      next_cursor: nextCursor,
      has_more: hasMore
    }
  };
};