import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersService } from "../services/userservice";

//hook para el manejo de todos los usuarios
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await usersService();
        setUsers(data);
      } catch (err) {
        if (err.status === 401) {
          navigate("/login");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
