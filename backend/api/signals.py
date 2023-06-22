from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile


@receiver(post_save, sender=Profile)
def generate_api_token(sender, instance, created, **kwargs):
    if created:
        instance.generate_api_token()
        instance.save()
