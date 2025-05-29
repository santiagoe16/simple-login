import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.access);
      
      navigate("/");
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <section className="row h-100 ms-0 me-0 w-100 d-flex justify-content-center text-white align-items-center">
      <div className="col card-black body-login align-content-center">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="text-center mb-4">Log in</h2>
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              ></input>
            </div>
            <div className={error ? "mb-2" : "mb-4"}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              ></input>
            </div>
            <p className="text-danger ms-1">{error ? error : null}</p>
            <div className="text-center mb-3">
              <button type="submit" className="purple-button w-100">
                Login
              </button>
            </div>
            <p>
              don't have an account?{" "}
              <Link to="/register">sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
