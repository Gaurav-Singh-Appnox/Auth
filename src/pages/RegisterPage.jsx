import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerUser } from "../store/slicer/authSlice";
import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

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

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`
        );
        console.log("Google User Info:", res.data);
        // Handle Google registration (e.g., dispatch an action with user data)
        // For example: dispatch(googleRegisterAction(res.data));
      } catch (error) {
        console.log("Google registration failed:", error);
      }
    },
    onError: (error) => console.log("Google Registration Failed:", error),
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      // Optionally handle registration success (e.g., navigate or show a message)
    } catch (error) {
      console.log("Registration failed", error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8 bg-slate-300">
      <p>Register</p>
      <div className="mt-2 h-[2px] bg-gray-400" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
        <label className="flex flex-col gap-1">
          <span>First Name:</span>
          <input className="outline rounded-md p-2" {...register("fname")} />
          <p>{errors.fname?.message}</p>
        </label>
        <label className="flex flex-col gap-1">
          <span>Last Name:</span>
          <input className="outline rounded-md p-2" {...register("lname")} />
          <p>{errors.lname?.message}</p>
        </label>
        <label className="flex flex-col gap-1">
          <span>Email:</span>
          <input className="outline rounded-md p-2" {...register("email")} />
          <p>{errors.email?.message}</p>
        </label>
        <label className="flex flex-col gap-1">
          <span>Password:</span>
          <input
            type="password"
            className="outline rounded-md p-2"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </label>
        <label className="flex flex-col gap-1">
          <span>Confirm Password:</span>
          <input
            type="password"
            className="outline rounded-md p-2"
            {...register("password_confirmation")}
          />
          <p>{errors.password_confirmation?.message}</p>
        </label>
        <input className="border-2 border-black p-2 rounded-md bg-blue-400 hover:bg-blue-600 hover:scale-105 transition-all" type="submit" />
      </form>
      <button
        onClick={registerWithGoogle}
        className="mt-4 border-2 border-black p-2 rounded bg-blue-400 hover:bg-blue-600 hover:scale-105 transition-all"
      >
        Register with Google 🚀
      </button>
    </div>
  );
};

export default Register;
