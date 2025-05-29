import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMyUser } from "../hooks/usemyuser";
import { updateProfile } from "../services/userservice";


//modal para editar el perfil del usuario logueado
export default function EditModal({ refreshUser }) {
  const { user, refreshUser: refreshUserModal } = useMyUser();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const updatedUser = {};

    if (fullName !== user?.full_name) {
      updatedUser.full_name = fullName;
    }

    if (email !== user?.email) {
      updatedUser.email = email;
    }

    if (password) {
      updatedUser.password = password;
    }
    try {
      const result = await updateProfile(updatedUser);
      refreshUserModal();
      refreshUser();
      clean();
      navigate("/");
      alert("Usuario actualizado correctamente");
    } catch (error) {
      setError(error.message);
      alert("Error al actualizar: " + error.message);
    }
  };

  const clean = () => {
    setFullName(user?.full_name || "");
    setEmail(user?.email || "");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="">
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Actualizar perfil
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div>
                  <div className="mb-4">
                    <label htmlFor="email">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter full name"
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
                    ></input>
                  </div>
                  <p className="text-danger ms-1">{error ? error : null}</p>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="purple-button">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
