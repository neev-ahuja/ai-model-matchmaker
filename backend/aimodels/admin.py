from django.contrib import admin

# Register your models here.

from django.contrib import admin
from .models import UserAPIKeys

@admin.register(UserAPIKeys)
class UserAPIKeysAdmin(admin.ModelAdmin):
    list_display = ('user', 'has_openai_key', 'has_gemini_key', 'has_claude_key', 'updated_at')
    list_filter = ('user',)
    search_fields = ('user__username',)
    readonly_fields = ('created_at', 'updated_at') # Make keys readonly in admin if not encrypted properly

    # Helper methods to show if keys exist without displaying them
    @admin.display(boolean=True)
    def has_openai_key(self, obj):
        return bool(obj.openai_api_key)

    @admin.display(boolean=True)
    def has_gemini_key(self, obj):
        return bool(obj.gemini_api_key)

    @admin.display(boolean=True)
    def has_claude_key(self, obj):
        return bool(obj.claude_api_key)
