
from django.urls import path, include
from .views import RegisterView, AccessOnlyTokenObtainPairView,ProfileView, AllProfiles
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path("register/", RegisterView.as_view(), name= "register"),
    path("login/", AccessOnlyTokenObtainPairView.as_view(), name= "login"),
    path("profile/", ProfileView.as_view(), name= "profile"),
    path("profiles/", AllProfiles.as_view(), name= "profiles"),
]
