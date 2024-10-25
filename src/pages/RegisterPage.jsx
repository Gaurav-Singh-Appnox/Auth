import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../store/slicer/authSlice";
import { useDispatch } from "react-redux";

const schema = yup.object({
  firstName: yup.string().required("Please provide your name."),
  lastName: yup.string().required("last name is requited"),
  email: yup.string().email().required(),
  password: yup.string().required("Please enter your password"),
});

const Register = () => {
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
      await Dispatch(registerUser(data)).unwrap();
    } catch (error) {
      console.log("registration failed", error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8">
      <p>Register </p>
      <div className="mt-2 h-[2px] bg-gray-400" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
        <label>
          First Name :
          <input className="outline ml-4" {...register("firstName")} />
          <p>{errors.firstName?.message}</p>
        </label>
        <label>
          {" "}
          Last Name :
          <input className="outline ml-4" {...register("lastName")} />
          <p>{errors.lastName?.message}</p>
        </label>
        <label>
          Email :
          <input className="outline ml-4" {...register("email")} />
          <p>{errors.email?.message}</p>
        </label>
        <label>
          {" "}
          Password :
          <input className="outline ml-4" {...register("password")} />
          <p>{errors.password?.message}</p>
        </label>
        <input className="border-2 border-black" type="submit" />
      </form>
    </div>
  );
};

export default Register;
