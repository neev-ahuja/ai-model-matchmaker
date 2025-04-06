from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import User
from .serializers import RegisterSerializer, UserSerializer, MyTokenObtainPairSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

class MyTokenObtainPairView(TokenObtainPairView):
    """
    Login View: Takes username and password, returns access and refresh tokens.
    Uses the custom serializer.
    """
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    """
    Registration View: Creates a new user.
    """
    queryset = User.objects.all()
    permission_classes = (AllowAny,) # Anyone can register
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveAPIView):
    """
    View to get the profile of the currently authenticated user.
    """
    permission_classes = (IsAuthenticated,) # Only authenticated users can access
    serializer_class = UserSerializer

    def get_object(self):
        # The request user is the authenticated user making the request
        return self.request.user

class LogoutView(APIView):
    """
    Logout View: Blacklists the refresh token.
    Requires the refresh token in the request body.
    """
    permission_classes = (IsAuthenticated,) # Must be logged in to log out

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            if not refresh_token:
                 return Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
        except TokenError as e:
            # This happens if the token is already blacklisted or invalid
             return Response({"detail": f"Token is invalid or expired: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError:
            return Response({"detail": "Refresh token not provided in request body."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Catch any other potential exceptions
            return Response({"detail": f"An error occurred during logout: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
