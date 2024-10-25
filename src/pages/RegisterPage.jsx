import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../store/slicer/authSlice";
import { useDispatch } from "react-redux";

const schema = yup.object({
  fname: yup.string().required("Please provide your first name."),
  lname: yup.string().required("Last name is required."),
  email: yup.string().email("Invalid email").required("Email is required."),
  password: yup.string().required("Please enter your password"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const Register = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("submit clicked", data);
    try {
      await dispatch(registerUser(data)).unwrap();
    } catch (error) {
      console.log("Registration failed", error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8">
      <p>Register</p>
      <div className="mt-2 h-[2px] bg-gray-400" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
        <label>
          First Name:
          <input className="outline ml-4" {...register("fname")} />
          <p>{errors.fname?.message}</p>
        </label>
        <label>
          Last Name:
          <input className="outline ml-4" {...register("lname")} />
          <p>{errors.lname?.message}</p>
        </label>
        <label>
          Email:
          <input className="outline ml-4" {...register("email")} />
          <p>{errors.email?.message}</p>
        </label>
        <label>
          Password:
          <input type="password" className="outline ml-4" {...register("password")} />
          <p>{errors.password?.message}</p>
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            className="outline ml-4"
            {...register("password_confirmation")}
          />
          <p>{errors.password_confirmation?.message}</p>
        </label>
        <input className="border-2 border-black" type="submit" />
      </form>
    </div>
  );
};

export default Register;
