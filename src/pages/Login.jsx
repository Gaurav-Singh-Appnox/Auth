import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../store/slicer/authSlice";
import { useDispatch } from "react-redux";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const Dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await Dispatch(login(data)).unwrap();
    } catch (error) {
      console.log("login failed", error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8">
      <p>Login </p>
      <div className="mt-2 h-[2px] bg-gray-400" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
        <label>
          Email
          <input className="outline ml-4" {...register("email")} />
          <p>{errors.email?.message}</p>
        </label>
        <label>
          {" "}
          Password
          <input className="outline ml-4" {...register("password")} />
          <p>{errors.password?.message}</p>
        </label>
        <input className="border-2 border-black" type="submit" />
      </form>
    </div>
  );
};

export default Login;
