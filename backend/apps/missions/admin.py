from django.contrib import admin
from .models import Mission


@admin.register(Mission)
class MissionAdmin(admin.ModelAdmin):
    list_display = ['mission_name', 'era', 'location', 'visited_at', 'progress']
    list_filter = ['era', 'visited_at']
    search_fields = ['mission_name', 'location']
    ordering = ['-visited_at']
