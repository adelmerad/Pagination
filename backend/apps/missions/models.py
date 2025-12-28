from django.db import models


class Mission(models.Model):
    """Mission completion records for Rifters AR game"""
    
    ERA_CHOICES = [
        ('Ancient', 'Ancient Era'),
        ('Medieval', 'Medieval Era'),
        ('Colonial', 'Colonial Era'),
        ('Modern', 'Modern Era'),
        ('Independence', 'Independence Era'),
    ]
    
    mission_name = models.CharField(max_length=255)
    era = models.CharField(max_length=32, choices=ERA_CHOICES)
    location = models.CharField(max_length=255)
    visited_at = models.DateTimeField()
    progress = models.IntegerField(default=0)  # 0-100
    
    class Meta:
        ordering = ['-visited_at']  # Most recent first
        indexes = [
            models.Index(fields=['-visited_at']),
        ]
    
    def __str__(self):
        return f"{self.mission_name} ({self.era})"
