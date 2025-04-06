from django.db import models

# Create your models here.

from django.db import models
from django.conf import settings
# Consider using django-cryptography or similar for real encryption
# from cryptography.fernet import Fernet # Example if implementing basic encryption
# import os

# # Example basic encryption setup (NOT PRODUCTION READY - use a dedicated library)
# # Store this key securely (e.g., environment variable) and DO NOT commit it.
# ENCRYPTION_KEY = os.environ.get('DJANGO_FIELD_ENCRYPTION_KEY', b'generate_a_secure_random_key_32_bytes')
# cipher_suite = Fernet(ENCRYPTION_KEY)

class UserAPIKeys(models.Model):
    """
    Stores API keys for different AI services associated with a user.
    IMPORTANT: Storing API keys directly as CharFields is insecure.
               In a production environment, you MUST encrypt these fields
               using libraries like django-cryptography or HashiCorp Vault.
               The example below shows basic CharFields for simplicity.
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='api_keys'
    )
    openai_api_key = models.CharField(max_length=255, blank=True, null=True, help_text="Encrypted OpenAI API Key")
    gemini_api_key = models.CharField(max_length=255, blank=True, null=True, help_text="Encrypted Google AI (Gemini) API Key")
    claude_api_key = models.CharField(max_length=255, blank=True, null=True, help_text="Encrypted Anthropic (Claude) API Key")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # # --- Basic Encryption Example (Illustrative - Use a proper library!) ---
    # def set_openai_key(self, raw_key):
    #     if raw_key:
    #         self.openai_api_key = cipher_suite.encrypt(raw_key.encode()).decode()
    #     else:
    #         self.openai_api_key = None

    # def get_openai_key(self):
    #     if self.openai_api_key:
    #         try:
    #             return cipher_suite.decrypt(self.openai_api_key.encode()).decode()
    #         except Exception: # Handle potential decryption errors
    #             return None # Or raise an error
    #     return None
    # # --- Repeat set/get methods for gemini and claude ---

    def __str__(self):
        return f"API Keys for {self.user.username}"

    class Meta:
        verbose_name_plural = "User API Keys"