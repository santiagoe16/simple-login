
//componente para mostrar los datos de todos los usuarios
export default function ProfileCard({fullName, email, password}) {
  return (
    <div className="profile-card d-flex flex-column justify-content-center">
      <p className="mb-2">
        <strong>Full Name: </strong>
        {fullName}
      </p>
      <p className="mb-2">
        <strong>Email: </strong>
        {email}
      </p>
      <p className="mb-2 overflow-hidden">
        <strong>Password: </strong>
        {password}
      </p>
    </div>
  );
}
