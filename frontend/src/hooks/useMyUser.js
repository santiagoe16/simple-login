// src/hooks/useMyUser.js
import { useEffect, useState } from "react";
import { myUser } from "../services/userservice";

//hook para el manejo de el usuario logueado
export function useMyUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchUser() {
    try {
      const userData = await myUser();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const refreshUser = () => {
    fetchUser();
  };

  return { user, refreshUser, loading, error };
}
