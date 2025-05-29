import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const data = await registerUser({ email, password, full_name: fullName });
      navigate("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="row h-100 ms-0 me-0 w-100 d-flex justify-content-center text-white align-items-center">
      <div className="col card-black body-login align-content-center">
        <form onSubmit={handleSubmit}>
          <div>
            <h2 className="text-center mb-4">Sign up</h2>
            <div className="mb-4">
              <label htmlFor="email">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                required
              ></input>
            </div>
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
            <div className="mb-4">
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
                <div className={error ? "mb-2" : "mb-4"}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                ></input>
                </div>
            <p className="text-danger ms-1">{error ? error : null}</p>
            <div className="text-center mb-3">
              <button type="submit" className="purple-button w-100">
                Register
              </button>
            </div>
            <p>
              Already have account?{" "}
              <Link to="/login">sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
