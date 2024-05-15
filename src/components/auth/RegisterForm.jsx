import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signupSchema } from "../../utils/validation/validation";
import AuthInput from "../customComponents/AuthInput";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import {
  changeStatus,
  registerUser,
} from "../../utils/redux/features/useSlice";
import Picture from "./Picture";
import axios from "axios";

export default function RegisterForm() {
  const [picture, setpicture] = useState();
  const [readablePicture, setReadablePicture] = useState();
  const { status, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    dispatch(changeStatus("loading"));

    if (picture) {
      await uploadPicture().then(async (res) => {
        data.picture = res.secure_url;
        data.asset_id = res.asset_id;
      });
    }
    const result = await dispatch(registerUser({ ...data }));
    if (result.type.includes("fulfilled")) {
      // navigate("/home");
    }else{
//  await deletePicture(data.asset_id).then(async (res) => {
//   console.log("res",res)
// });
    }
  };
  const uploadPicture = async () => {
    let formData = new FormData();
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_SECRET);
    formData.append("file", picture);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME
      }/image/upload`,
      formData
    );
    return data;
  };
 const deletePicture = async (public_id) => {
    

    const { data } = await axios.delete(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_NAME
      }/image/destroy/${public_id}`,
      {
        headers:{
Authorization:`Cloudinary ${import.meta.env.VITE_CLOUDINARY_API_KEY}:${import.meta.env.VITE_CLOUDINARY_API_SECRET}`
        },
        public_id,
        api_secret:import.meta.env.VITE_CLOUDINARY_API_SECRET,
        api_key:import.meta.env.VITE_CLOUDINARY_API_KEY
      },
      {
        
      }
    );
    return data;
  };
  return (
    <div className=" min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/*Container*/}
      <div className=" w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*Heading*/}

        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        {/*Form*/}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Full name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="email"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {/*Picture */}
          <Picture
            readablePicture={readablePicture}
            setReadablePicture={setReadablePicture}
            setpicture={setpicture}
          />
          {/*If we have an error */}
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}
          {/*Submit button*/}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in"
            type="submit"
          >
            {status === "loading" ? (
              <PulseLoader color="#fff" size={14} />
            ) : (
              "Sign Up"
            )}
          </button>
          {/*Sign in link*/}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>have an account?</span>
            <Link
              to={"/login"}
              className="hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
