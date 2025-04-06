from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Customizes the JWT claim set. Can add extra user data here if needed.
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims (optional)
        token['username'] = user.username
        # token['email'] = user.email
        # ... add more claims as needed

        return token

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Includes password confirmation.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        # Specify extra kwargs for fields if needed, e.g., making email unique if not already handled
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
             'email': {'required': True} # Ensure email is required
        }

    def validate(self, attrs):
        # Check if passwords match
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        # Check if email already exists (case-insensitive)
        if User.objects.filter(email__iexact=attrs['email']).exists():
            raise serializers.ValidationError({"email": "Email already exists."})

        # Check if username already exists (case-insensitive)
        if User.objects.filter(username__iexact=attrs['username']).exists():
             raise serializers.ValidationError({"username": "Username already exists."})

        return attrs

    def create(self, validated_data):
        # Create the user instance
        user = User.objects.create(
            username=validated_data['username'].lower(), # Store username as lowercase
            email=validated_data['email'].lower(), # Store email as lowercase
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )

        # Hash the password
        user.set_password(validated_data['password'])
        user.save()

        return user

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for displaying user information (excluding sensitive data).
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name') # Add fields you want to expose
