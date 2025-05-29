# Backend - Protech API

Este es el backend de la aplicación Protech. Proporciona una API REST para el registro, autenticación y gestión de usuarios.

## 🛠️ Pasos para usar el backend

1. Clona el repositorio con el comando git clone seguido de la URL de tu repositorio.

2. Entra a la carpeta del backend usando cd tu-repo/backend.

3. Crea y activa un entorno virtual con python -m venv env y luego source env/bin/activate o en Windows usa env\Scripts\activate.

4. Instala las dependencias con pip install -r requirements.txt.

5. Crea un archivo .env en la raíz del backend y agrega las variables necesarias como SECRET_KEY, DEBUG, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST y DB_PORT.

6. Ejecuta las migraciones con python manage.py makemigrations seguido de python manage.py migrate.

7. Inicia el servidor con python manage.py runserver.

8. La API estará disponible en http://localhost:8000.
