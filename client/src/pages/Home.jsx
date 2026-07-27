import { useNavigate } from "react-router-dom";
function Home() {

  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};
  return (

    <>
    <h1>Home Page</h1>

      <button onClick={handleLogout}>
      Logout
    </button>
    </>
  )
}

export default Home;