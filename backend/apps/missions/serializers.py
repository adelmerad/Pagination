from rest_framework import serializers
from .models import Mission


class MissionSerializer(serializers.ModelSerializer):
    """Serializer for Mission model"""
    
    class Meta:
        model = Mission
        fields = ['id', 'mission_name', 'era', 'location', 'visited_at', 'progress']
        read_only_fields = ['id']
