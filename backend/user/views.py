from django.shortcuts import render
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import CustomUser
from .serializers import CustomUserSerializer, AccessOnlyTokenObtainPairSerializer, UserProfileSerializer

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CustomUserSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
        except ValidationError as e:
            if 'email' in e.detail and any('already exist' in str(msg) for msg in e.detail['email']):
                return Response({'detail': e.detail['email'][0]}, status=status.HTTP_409_CONFLICT)
            return Response({'detail': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class AccessOnlyTokenObtainPairView(TokenObtainPairView):
    serializer_class = AccessOnlyTokenObtainPairSerializer

class ProfileView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)

        try:
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
        except ValidationError as e:
            if 'email' in e.detail and any('already exist' in str(msg) for msg in e.detail['email']):
                return Response({'detail': e.detail['email'][0]}, status=status.HTTP_409_CONFLICT)
            return Response({'detail': e.detail}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({"detail": "User deleted successfully"}, status=status.HTTP_200_OK)
    
class AllProfiles(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UserProfileSerializer