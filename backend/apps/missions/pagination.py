from rest_framework.pagination import CursorPagination
from rest_framework.response import Response


class MissionCursorPagination(CursorPagination):
    """
    Custom cursor pagination to match frontend expectations:
    Response format: { data: [...], pagination: { next_cursor, has_more } }
    """
    page_size = 3
    ordering = '-visited_at'  # Order by most recent first
    cursor_query_param = 'cursor'
    
    def get_paginated_response(self, data):
        """Override to match frontend's expected response structure"""
        next_link = self.get_next_link()
        
        # Extract cursor from next_link if it exists
        next_cursor = None
        if next_link:
            from urllib.parse import urlparse, parse_qs
            parsed = urlparse(next_link)
            cursor_params = parse_qs(parsed.query)
            if 'cursor' in cursor_params:
                next_cursor = cursor_params['cursor'][0]
        
        return Response({
            'data': data,
            'pagination': {
                'next_cursor': next_cursor,
                'has_more': next_link is not None,
            }
        })
