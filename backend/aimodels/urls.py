from django.urls import path
from . import views

app_name = 'aimodels'

urlpatterns = [
    # Endpoint to manage user API keys
    path('keys/', views.UserAPIKeysView.as_view(), name='user-api-keys'),

    # Endpoints for specific AI models
    path('openai/', views.OpenAIView.as_view(), name='openai-interact'),
    path('gemini/', views.GeminiView.as_view(), name='gemini-interact'),
    path('claude/', views.ClaudeView.as_view(), name='claude-interact'),
]
