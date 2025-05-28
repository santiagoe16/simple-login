from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, required = True)
    #valida el formato del email
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    class Meta: 
        model = User
        fields = ['id', 'email', 'password', 'full_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_password(self, password):
        if len(password) < 6:
            raise serializers.ValidationError("The password must be at least 6 characters long")
        
        return password


    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create_user(password = password, **validated_data)
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    #verifica que se aun email valido
    email = serializers.EmailField(required=False, validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ['id', 'email', 'full_name', "password"]
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {"required": False},
            'full_name': {'required': False}
        }
    def validate_password(self, password):
        #verifica que la contraseña tenga al menos 6 caracteres
        if password:
            if len(password) < 6:
                raise serializers.ValidationError("The password must be at least 6 characters long")
        
        return password
    
    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if password:
            #hashea en actualizar la contraseña
            instance.set_password(password)
        instance.save()
        
        return instance
    
class AccessOnlyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        #elimino el token refresh ya que no es necesario para este proyecto
        return {'access': data["access"]} 
    