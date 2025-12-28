from django.core.management.base import BaseCommand
from django.utils import timezone
from missions.models import Mission
from datetime import timedelta


class Command(BaseCommand):
    help = 'Seed database with Algerian historical mission data'

    def handle(self, *args, **kwargs):
        # Clear existing missions
        Mission.objects.all().delete()
        
        missions_data = [
            {
                "mission_name": "Roman Ruins of Djemila",
                "era": "Ancient",
                "location": "Djemila, Setif Province",
                "visited_at": timezone.now() - timedelta(days=100),
                "progress": 100
            },
            {
                "mission_name": "The Casbah of Algiers",
                "era": "Medieval",
                "location": "Algiers Old City",
                "visited_at": timezone.now() - timedelta(days=95),
                "progress": 85
            },
            {
                "mission_name": "French Quarter of Oran",
                "era": "Colonial",
                "location": "Oran City Center",
                "visited_at": timezone.now() - timedelta(days=90),
                "progress": 70
            },
            {
                "mission_name": "Martyrs' Memorial",
                "era": "Independence",
                "location": "Algiers",
                "visited_at": timezone.now() - timedelta(days=85),
                "progress": 95
            },
            {
                "mission_name": "Great Mosque of Algiers",
                "era": "Modern",
                "location": "Algiers Bay",
                "visited_at": timezone.now() - timedelta(days=80),
                "progress": 60
            },
            {
                "mission_name": "Tassili n'Ajjer Rock Art",
                "era": "Ancient",
                "location": "Sahara Desert",
                "visited_at": timezone.now() - timedelta(days=75),
                "progress": 80
            },
            {
                "mission_name": "Tlemcen Grand Mosque",
                "era": "Medieval",
                "location": "Tlemcen",
                "visited_at": timezone.now() - timedelta(days=70),
                "progress": 90
            },
            {
                "mission_name": "National Museum of Mujahid",
                "era": "Independence",
                "location": "Algiers",
                "visited_at": timezone.now() - timedelta(days=65),
                "progress": 100
            },
            {
                "mission_name": "Tipasa Archaeological Park",
                "era": "Ancient",
                "location": "Tipasa",
                "visited_at": timezone.now() - timedelta(days=60),
                "progress": 75
            },
            {
                "mission_name": "Hassan Pasha Palace",
                "era": "Medieval",
                "location": "Oran",
                "visited_at": timezone.now() - timedelta(days=55),
                "progress": 88
            }
        ]
        
        for mission_data in missions_data:
            Mission.objects.create(**mission_data)
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully seeded {len(missions_data)} missions')
        )
