# 🛠 Proyecto Full Stack - Registro y Gestión de Usuarios

Este proyecto es una aplicación web completa que permite registrar usuarios, iniciar sesión, editar sus datos y eliminar sus cuentas. Está construida con React en el frontend y Django REST Framework en el backend.

---
### video presentando la app web: [text](https://drive.google.com/file/d/16XD8nTH5uIq4m8yTO3COJ0PT79r-vCiM/view?usp=sharing)

## 📌 Funcionalidades Requeridas

✅ **Formulario de Registro:**
- Nombre completo  
- Correo electrónico  
- Contraseña  

✅ **Validaciones en frontend y backend:**
- Todos los campos son obligatorios  
- Validación de formato de correo  
- Contraseña de mínimo 6 caracteres  

✅ **Backend:**
- Verifica si el correo ya existe
- Hashea la contraseña antes de guardar
- Almacena los datos en una base de datos PostgreSQL
- Genera la base de datos automáticamente al migrar

✅ **Vista de usuarios:**
- Muestra una lista con los nombres. correos registrados y contraseñas (hasheadas requerimiento)

✅ **Autenticación:**
- JWT para login, registro y acceso a rutas protegidas

✅ **Edición y eliminación de usuarios:**
- Los usuarios pueden editar solo su perfil o eliminar solo su cuenta

---

## 🧩 Tecnologías Utilizadas

### Backend (Django):
- Django
- Django REST Framework
- djangorestframework-simplejwt
- PostgreSQL

### Frontend (React):
- React con Vite
- React Router
- Bootstrap para el estilo
- Fetch API para consumir endpoints

## Leer los readme de las carpetas frontend y backend para su instalacion

