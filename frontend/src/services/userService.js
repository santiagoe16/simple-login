const API_URL = import.meta.env.VITE_API_URL;

//servicio para obtener todos los usuarios
export async function usersService() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. El usuario no está autenticado.");
  }

  const response = await fetch(`${API_URL}profiles/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.detail || "Error al obtener los usuarios";
    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return await response.json();
}

//servicio para obter el usuario logueado
export async function myUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. El usuario no está autenticado.");
  }

  try {
    const response = await fetch(`${API_URL}profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al obtener el usuario");
    }
    return await response.json();
  } catch (error) {
    console.error("Error al obtener usuario:", error.message);
    throw error;
  }
}

//servicio para eliminar el usuario logueado
export async function deleteMyUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. El usuario no está autenticado.");
  }

  try {
    const response = await fetch(`${API_URL}profile/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to delete user");
    }

    return true; 
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
}

//servicio para actualizar el usuario logueado
export async function updateProfile(updatedData) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token no encontrado. El usuario no está autenticado.");
  }

  const response = await fetch(`${API_URL}profile/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Error al actualizar usuario");
  }

  return await response.json();
}
