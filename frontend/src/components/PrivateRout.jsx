import { Navigate } from "react-router-dom";

//componente que verifica si el usuario está logueado
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
