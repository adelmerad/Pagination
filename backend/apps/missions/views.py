from rest_framework import generics
from .models import Mission
from .serializers import MissionSerializer
from .pagination import MissionCursorPagination


class MissionListAPIView(generics.ListAPIView):
    """
    API endpoint for listing missions with cursor pagination.
    GET /api/missions/ - Get paginated mission list
    GET /api/missions/?cursor=<cursor_value> - Get next page
    """
    queryset = Mission.objects.all()
    serializer_class = MissionSerializer
    pagination_class = MissionCursorPagination
