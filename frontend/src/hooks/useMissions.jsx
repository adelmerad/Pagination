import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMissions } from '../services/missionService';

// Cursor pagination with React Query: each page knows the cursor of the next one,
// and React Query keeps the loaded pages, the loading state and the errors.
export const useMissions = () => {
  const query = useInfiniteQuery({
    queryKey: ['missions'],
    queryFn: ({ pageParam }) => fetchMissions(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.has_more ? lastPage.pagination.next_cursor : undefined,
  });

  const missions = useMemo(
    () => query.data?.pages.flatMap((page) => page.data) ?? [],
    [query.data]
  );

  return {
    missions,
    loading: query.isPending || query.isFetchingNextPage,
    hasMore: Boolean(query.hasNextPage),
    error: query.error ? query.error.message : null,
    initialLoad: query.isPending,
    loadMore: () => {
      if (query.hasNextPage && !query.isFetchingNextPage) query.fetchNextPage();
    },
    // retry the request that failed: the first page, or the next one
    retry: () => (query.data ? query.fetchNextPage() : query.refetch()),
  };
};
