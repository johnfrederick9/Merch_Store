from django.apps import AppConfig

class StoreMerchConfig(AppConfig):  # Use your actual app name
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'store_merch'

    def ready(self):
        import store_merch.signals
