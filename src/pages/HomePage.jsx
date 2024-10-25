import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className=" w-[80%] mx-auto flex justify-between py-2 ">
      <p>{user.firstName || "user is not login"}</p>
      <p>{user.laststName}</p>
      <p>{user.email}</p>
      <p>{user.password}</p>
    </div>
  );
};

export default Home;
