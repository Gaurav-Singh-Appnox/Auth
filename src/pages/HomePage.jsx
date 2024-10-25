import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="">
      <p>{user.firstName || "guest"}</p>
      <p>{user.laststName}</p>
      <p>{user.email}</p>
      <p>{user.password}</p>
    </div>
  );
};

export default Home;
