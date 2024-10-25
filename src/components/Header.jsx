import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full shadow-md">
      <div className="w-[80%] mx-auto flex justify-between py-2 ">
        <NavLink to={'/'} className="font-bold text-lg">Logo</NavLink>
        <div className="flex gap-4">
          <NavLink to={"/login"} className="py-2 px-4 font-bold ">
            Login
          </NavLink>
          <NavLink to={"/register"} className="py-2 px-4 font-bold ">
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
