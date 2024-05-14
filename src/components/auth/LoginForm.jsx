import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { signupSchema } from '../../utils/validation/validation';
import AuthInput from '../customComponents/AuthInput';
import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export default function LoginForm() {
  const {status}=useSelector(state=>state.user)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  console.log("values", watch());
  console.log("errors ", errors);
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      {/*Container*/}
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*Heading*/}

        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        {/*Form*/}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
         
          <AuthInput
            name="email"
            type="email"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
         
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {/*Submit button*/}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in"
            type="submit"
          >
           {status==="loading"?(
           <PulseLoader color="#fff" size={14}/>
           ):"Sign In"} 
          </button>
 {/*Sign in link*/}
<p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
<span>have an account?</span>
<Link to={"/register"} className="hover:underline cursor-pointer transition ease-in duration-300" >Sign up</Link>
</p>
        </form>
      </div>
    </div>
  );
}
