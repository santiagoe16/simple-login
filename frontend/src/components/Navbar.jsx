import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/login");
  };


  return (
    <nav className="navbar navbar-dark">
      <div className="container">
        <a className="navbar-brand">Simple Log In</a>
        <button onClick={handleLogout} className="btn btn-danger">Log out</button>
      </div>
    </nav>
  );
}
