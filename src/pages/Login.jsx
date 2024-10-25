import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../store/slicer/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const schema = yup.object({
  email: yup.string().email().required("Email is required."),
  password: yup.string().required("Please enter your password"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`);
        console.log("Google User Info:", res.data);
        // Handle Google login (e.g., dispatch an action with user data)
        // For example: dispatch(googleLoginAction(res.data));
        navigate('/'); // Redirect after successful login
      } catch (error) {
        console.log("Google login failed:", error);
      }
    },
    onError: (error) => console.log('Google Login Failed:', error)
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate('/');
    } catch (error) {
      console.log("Login failed", error);
    }
  };

  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8">
      <p>Login</p>
      <div className="mt-2 h-[2px] bg-gray-400" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-6">
        <label className="flex flex-col">
          <span className="mb-2">Email:</span>
          <input className="outline w-full p-2 rounded" {...register("email")} />
          <p className="text-red-500">{errors.email?.message}</p>
        </label>
        <label className="flex flex-col">
          <span className="mb-2">Password:</span>
          <input className="outline w-full p-2 rounded" type="password" {...register("password")} />
          <p className="text-red-500">{errors.password?.message}</p>
        </label>
        <input className="border-2 border-black p-2 rounded" type="submit" />
      </form>
      <button onClick={loginWithGoogle} className="mt-4 border-2 border-black p-2 rounded">
        Sign in with Google 🚀
      </button>
    </div>
  );
};

export default Login;
