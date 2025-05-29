const API_URL = import.meta.env.VITE_API_URL;

//servicio de login
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_URL}login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json().catch(() => ({})); // evita fallo si no es JSON

    if (!response.ok) {
      throw new Error(data.detail || "Login failed");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Error inesperado al iniciar sesión");
  }
}

//servicio de registro
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.detail || "Error in registration");
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Unexpected error in registration");
  }
}
