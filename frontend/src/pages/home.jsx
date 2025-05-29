import ProfileCard from "../components/ProfileCard";
import PersonalProfileCard from "../components/PersonalProfileCard";
import Navbar from "../components/Navbar";
import { useUsers } from "../hooks/useUsers";
import { useMyUser } from "../hooks/usemyuser";
import EditModal from "../components/EditModal";

export default function Home() {
  const { users, loading, error } = useUsers();
  const { user: myUser, refreshUser, loading: loadingUser, error: errorUser } = useMyUser();

  return (
    <main className="h-100 w-100">
      <Navbar />
      <EditModal refreshUser={refreshUser} />
      <div className="row w-100 h-100 d-flex justify-content-between ms-0 me-0 ">
        <div className="col-12 col-lg-8 d-flex flex-column align-items-center mb-5">
          <h3 style={{ marginBottom: "30px", color: "white" }}>
            Public Profiles{" "}
          </h3>
          {loading ? (
            <h2>Cargando usuarios</h2>
          ) : (
            <div className="d-flex justify-content-center flex-wrap gap-3">
              {users.map((user) => (
                <ProfileCard
                  key={user.id}
                  email={user.email}
                  fullName={user.full_name}
                  password={user.password}
                />
              ))}
            </div>
          )}
          {error && <h2>Error al cargar usuarios</h2>}
        </div>
        <div className="col-12 col-lg-4 d-flex flex-column align-items-center text-white pb-5 ms-0 me-0">
          <h3 className="title-my-profile">My profile</h3>
          {loadingUser ? (
            <h3 className="title-my-profile">Cargando perfil...</h3>
          ) : errorUser ? (
            <h3 className="title-my-profile">Error al cargar perfil</h3>
          ) : (
            <PersonalProfileCard
              email={myUser.email}
              fullName={myUser.full_name}
              password={myUser.password}
            />
          )}
        </div>
      </div>
    </main>
  );
}
