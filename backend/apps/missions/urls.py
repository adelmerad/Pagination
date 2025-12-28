from django.urls import path
from .views import MissionListAPIView

urlpatterns = [
    path('missions/', MissionListAPIView.as_view(), name='mission-list'),
]
