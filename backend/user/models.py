from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password = None, **extra_fields):
        #verificar que haya email
        if not email:
            raise ValueError("Email is required")
        #normaliza el email y lo pone todo en mayusculas
        email = self.normalize_email(email)
        #crea la instacia del usuario y pone los campos extras
        user = self.model(email = email, **extra_fields)
        #establece la contraseña y la hashea
        user.set_password(password)
        
        user.save(using = self.db)
        return user
    
    def create_superuser(self, email, password = None, **extra_fields):
        #se define al super usuario como staff y superusuario
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        # Asegura que esos campos están verdaderos
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True')

        # Usa create_user para crear el superuser
        return self.create_user(email, password, **extra_fields)
    
class CustomUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(unique=True) #email sera el usuario y sera unico
    full_name = models.CharField(max_length = 70) 
    is_active = models.BooleanField(default = True) # para borrado suave
    is_staff = models.BooleanField(default = False)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['full_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email