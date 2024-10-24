import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  return (
    <div className="max-w-[600px] w-[80vw] mx-auto mt-8 shadow-md rounded-md p-8">
      <p>register </p>
      <form action="">

      </form>
    </div>
  );
};

export default Register;
