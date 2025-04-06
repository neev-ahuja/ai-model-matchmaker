from django.shortcuts import render

# Create your views here.

from rest_framework import generics, views, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.conf import settings

# Import AI libraries
import openai
import google.generativeai as genai
import anthropic

from .models import UserAPIKeys
from .serializers import UserAPIKeysSerializer, PromptSerializer

# --- API Key Management View ---

class UserAPIKeysView(generics.RetrieveUpdateAPIView):
    """
    Allows authenticated users to view the status of their API keys
    and update them. Keys are never returned in the response.
    """
    serializer_class = UserAPIKeysSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Get or create the API key entry for the current user
        obj, created = UserAPIKeys.objects.get_or_create(user=self.request.user)
        return obj

    def perform_update(self, serializer):
        # Ensure the update is associated with the requesting user
        # get_object already handles filtering by user, but this is good practice
        serializer.save(user=self.request.user)


# --- AI Model Interaction Views ---

class BaseAIView(views.APIView):
    """Base class for AI model views to handle common logic."""
    permission_classes = [permissions.IsAuthenticated]
    prompt_serializer_class = PromptSerializer

    def get_api_keys(self, request):
        """Retrieve the UserAPIKeys object for the logged-in user."""
        try:
            return UserAPIKeys.objects.get(user=request.user)
        except UserAPIKeys.DoesNotExist:
            return None

    def handle_missing_key(self, key_name):
        """Return a standard error response for missing API keys."""
        return Response(
            {"error": f"API key for {key_name} not found. Please add it via the keys endpoint."},
            status=status.HTTP_403_FORBIDDEN
        )

    def handle_api_error(self, service_name, error):
        """Return a standard error response for external API errors."""
        # Log the actual error for debugging
        print(f"Error calling {service_name}: {error}") # Replace with proper logging
        return Response(
            {"error": f"An error occurred while contacting the {service_name} API."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )


class OpenAIView(BaseAIView):
    """View to interact with the OpenAI API."""

    def post(self, request, *args, **kwargs):
        prompt_serializer = self.prompt_serializer_class(data=request.data)
        if not prompt_serializer.is_valid():
            return Response(prompt_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user_keys = self.get_api_keys(request)
        # Replace with user_keys.get_openai_key() if using encryption methods
        api_key = user_keys.openai_api_key if user_keys else None

        if not api_key:
            return self.handle_missing_key("OpenAI")

        prompt = prompt_serializer.validated_data['prompt']

        try:
            # Ensure you have the correct client initialization based on your openai lib version
            # Older versions: openai.api_key = api_key
            # Newer versions (>=1.0):
            client = openai.OpenAI(api_key=api_key)

            # Example using ChatCompletion (adjust model and parameters as needed)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo", # Or "gpt-4" etc.
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ]
                # max_tokens=150 # Optional parameters
            )
            # Extract the relevant part of the response
            # Check the structure of the response object from the library version you use
            ai_response = response.choices[0].message.content.strip()
            return Response({"response": ai_response}, status=status.HTTP_200_OK)

        except openai.AuthenticationError:
             return Response({"error": "Invalid OpenAI API key."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return self.handle_api_error("OpenAI", e)


class GeminiView(BaseAIView):
    """View to interact with the Google AI (Gemini) API."""

    def post(self, request, *args, **kwargs):
        prompt_serializer = self.prompt_serializer_class(data=request.data)
        if not prompt_serializer.is_valid():
            return Response(prompt_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user_keys = self.get_api_keys(request)
        # Replace with user_keys.get_gemini_key() if using encryption methods
        api_key = user_keys.gemini_api_key if user_keys else None

        if not api_key:
            return self.handle_missing_key("Gemini")

        prompt = prompt_serializer.validated_data['prompt']

        try:
            genai.configure(api_key=api_key)
            # Choose the appropriate model
            model = genai.GenerativeModel('gemini-2.0-flash') # Or other gemini models
            response = model.generate_content(prompt)

            # Handle potential safety blocks or empty responses
            if not response.parts:
                 # Check response.prompt_feedback for block reasons if needed
                 if response.prompt_feedback.block_reason:
                     reason = response.prompt_feedback.block_reason.name
                     return Response({"error": f"Content blocked by Gemini safety filters. Reason: {reason}"}, status=status.HTTP_400_BAD_REQUEST)
                 else:
                     return Response({"error": "Gemini returned an empty response."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            ai_response = response.text # Accessing the text directly
            return Response({"response": ai_response}, status=status.HTTP_200_OK)

        # Specific exceptions for google-generativeai might need checking,
        # e.g., AuthenticationError, PermissionDeniedError. Catch broad for now.
        except Exception as e:
            # Check if it's an authentication issue (may need specific error types)
            if "API key not valid" in str(e): # Simple string check, refine if possible
                 return Response({"error": "Invalid Gemini API key."}, status=status.HTTP_403_FORBIDDEN)
            return self.handle_api_error("Gemini", e)


class ClaudeView(BaseAIView):
    """View to interact with the Anthropic (Claude) API."""

    def post(self, request, *args, **kwargs):
        prompt_serializer = self.prompt_serializer_class(data=request.data)
        if not prompt_serializer.is_valid():
            return Response(prompt_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user_keys = self.get_api_keys(request)
        # Replace with user_keys.get_claude_key() if using encryption methods
        api_key = user_keys.claude_api_key if user_keys else None

        if not api_key:
            return self.handle_missing_key("Claude")

        prompt = prompt_serializer.validated_data['prompt']

        try:
            client = anthropic.Anthropic(api_key=api_key)
            # Example call (adjust model and parameters)
            message = client.messages.create(
                model="claude-3-opus-20240229", # Or claude-3-sonnet, claude-2.1 etc.
                max_tokens=1024,
                messages=[
                    {
                        "role": "user",
                        "content": prompt
                    }
                ]
            )
            # Extract response content
            ai_response = ""
            if message.content and isinstance(message.content, list):
                 # Find the text block in the content list
                 text_blocks = [block.text for block in message.content if block.type == 'text']
                 if text_blocks:
                     ai_response = text_blocks[0]

            return Response({"response": ai_response}, status=status.HTTP_200_OK)

        except anthropic.AuthenticationError:
             return Response({"error": "Invalid Claude API key."}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return self.handle_api_error("Claude", e)
