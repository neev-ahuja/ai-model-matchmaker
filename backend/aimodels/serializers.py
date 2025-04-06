from rest_framework import serializers
from .models import UserAPIKeys

class UserAPIKeysSerializer(serializers.ModelSerializer):
    """
    Serializer for viewing and updating user API keys.
    Keys are write-only for security during updates.
    """
    # Make keys write_only to prevent them from being sent back in responses
    openai_api_key = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True, style={'input_type': 'password'})
    gemini_api_key = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True, style={'input_type': 'password'})
    claude_api_key = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True, style={'input_type': 'password'})

    # Add read-only fields to indicate if a key is set, without exposing the key
    has_openai_key = serializers.SerializerMethodField()
    has_gemini_key = serializers.SerializerMethodField()
    has_claude_key = serializers.SerializerMethodField()

    class Meta:
        model = UserAPIKeys
        fields = [
            'openai_api_key', 'gemini_api_key', 'claude_api_key', # Write-only fields
            'has_openai_key', 'has_gemini_key', 'has_claude_key', # Read-only status fields
            'updated_at'
        ]
        read_only_fields = ['updated_at'] # user is implicit

    def get_has_openai_key(self, obj):
        return bool(obj.openai_api_key)

    def get_has_gemini_key(self, obj):
        return bool(obj.gemini_api_key)

    def get_has_claude_key(self, obj):
        return bool(obj.claude_api_key)

    # If using basic encryption from model example:
    # def update(self, instance, validated_data):
    #     if 'openai_api_key' in validated_data:
    #         instance.set_openai_key(validated_data.pop('openai_api_key'))
    #     if 'gemini_api_key' in validated_data:
    #         instance.set_gemini_key(validated_data.pop('gemini_api_key'))
    #     if 'claude_api_key' in validated_data:
    #         instance.set_claude_key(validated_data.pop('claude_api_key'))
    #     # Update other fields normally
    #     return super().update(instance, validated_data)


class PromptSerializer(serializers.Serializer):
    """Serializer for accepting user prompts."""
    prompt = serializers.CharField(required=True, trim_whitespace=True)
    # You could add more fields like 'max_tokens', 'temperature' etc. if needed
