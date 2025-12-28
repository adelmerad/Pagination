from django.core.management.base import BaseCommand
from django.utils import timezone
from missions.models import Mission
from datetime import timedelta
import random


class Command(BaseCommand):
    help = 'Seed database with 300 Algerian historical mission data'

    def handle(self, *args, **kwargs):
        # Clear existing missions
        Mission.objects.all().delete()
        
        # Algerian historical missions data templates
        missions_templates = {
            'Ancient': [
                ("Roman Ruins of Djemila", "Djemila, Setif Province"),
                ("Timgad Archaeological Site", "Batna Province"),
                ("Tipasa Archaeological Park", "Tipasa"),
                ("Tassili n'Ajjer Rock Art", "Sahara Desert"),
                ("Madghacen Tomb", "Batna Province"),
                ("Royal Mausoleum of Mauretania", "Tipaza"),
                ("Numidian Ruins of Cirta", "Constantine"),
                ("Ancient City of Cuicul", "Setif Province"),
                ("Phoenician Trading Post", "Annaba"),
                ("Berber Cave Paintings", "Tassili Mountains"),
            ],
            'Medieval': [
                ("The Casbah of Algiers", "Algiers Old City"),
                ("Tlemcen Grand Mosque", "Tlemcen"),
                ("Hassan Pasha Palace", "Oran"),
                ("Ketchaoua Mosque", "Algiers"),
                ("Sidi Boumediene Mosque", "Tlemcen"),
                ("Beni Hammad Fort", "M'Sila Province"),
                ("Qalaa of Beni Hammad", "Hodna Mountains"),
                ("Great Mosque of Algiers", "Algiers Bay"),
                ("Mansourah Ruins", "Tlemcen"),
                ("Palace of Ahmed Bey", "Constantine"),
            ],
            'Colonial': [
                ("French Quarter of Oran", "Oran City Center"),
                ("Notre Dame d'Afrique", "Algiers Bay"),
                ("Dar Aziza Palace", "Algiers"),
                ("French Colonial Archives", "Algiers"),
                ("Emir Abdelkader Mosque", "Constantine"),
                ("Santa Cruz Fort", "Oran"),
                ("Jardin d'Essai du Hamma", "Algiers"),
                ("French Governor's Palace", "Oran"),
                ("Colonial Railway Station", "Blida"),
                ("Fort de la Casbah", "Algiers"),
            ],
            'Modern': [
                ("Great Mosque of Algiers", "Algiers Bay"),
                ("Maqam Echahid Monument", "Algiers"),
                ("Martyrs' Memorial", "Algiers"),
                ("National Museum of Art", "Algiers"),
                ("Bardo Museum", "Algiers"),
                ("Algiers Opera House", "Algiers"),
                ("Modern Casbah District", "Algiers"),
                ("University of Algiers", "Ben Aknoun"),
                ("Port of Algiers", "Mediterranean Coast"),
                ("Houari Boumediene Airport", "Algiers"),
            ],
            'Independence': [
                ("Martyrs' Memorial", "Algiers"),
                ("National Museum of Mujahid", "Algiers"),
                ("Emir Abdelkader Square", "Algiers"),
                ("Place des Martyrs", "Algiers"),
                ("Independence Archives", "Oran"),
                ("Revolution Museum", "Constantine"),
                ("Battle of Algiers Site", "Casbah, Algiers"),
                ("FLN Headquarters", "Algiers"),
                ("Memorial of the Fallen", "Setif"),
                ("Liberation Square", "Tlemcen"),
            ],
        }
        
        missions = []
        base_date = timezone.now()
        
        # Generate 300 missions
        for i in range(300):
            # Randomly select an era
            era = random.choice(list(missions_templates.keys()))
            
            # Randomly select a mission template from that era
            mission_template = random.choice(missions_templates[era])
            mission_name, location = mission_template
            
            # Add variety to mission names
            suffixes = [
                "", 
                " Exploration", 
                " Discovery", 
                " Investigation",
                " Reconnaissance",
                " Survey",
                " Documentation",
                " Excavation"
            ]
            
            full_mission_name = mission_name + random.choice(suffixes)
            
            # Generate visited date (spread over last 365 days)
            days_ago = random.randint(1, 365)
            hours_ago = random.randint(0, 23)
            minutes_ago = random.randint(0, 59)
            visited_at = base_date - timedelta(
                days=days_ago, 
                hours=hours_ago, 
                minutes=minutes_ago
            )
            
            # Generate progress (weighted towards higher completion)
            progress_options = (
                [100] * 30 +  # 30% chance of 100%
                [95] * 15 +   # 15% chance of 95%
                [90] * 15 +   # 15% chance of 90%
                [85] * 10 +   # 10% chance of 85%
                [80] * 10 +   # 10% chance of 80%
                [75] * 10 +   # 10% chance of 75%
                list(range(50, 75))  # Remaining spread between 50-74%
            )
            progress = random.choice(progress_options)
            
            missions.append(Mission(
                mission_name=full_mission_name,
                era=era,
                location=location,
                visited_at=visited_at,
                progress=progress
            ))
        
        # Bulk create for better performance
        Mission.objects.bulk_create(missions)
        
        self.stdout.write(
            self.style.SUCCESS(f'✅ Successfully seeded {len(missions)} missions')
        )
        
        # Show statistics
        for era in missions_templates.keys():
            count = Mission.objects.filter(era=era).count()
            self.stdout.write(f'  📍 {era}: {count} missions')
