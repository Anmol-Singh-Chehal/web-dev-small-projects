import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from '../features/authSlice';
import { updateOn, updateOff } from "../features/updateSlice"
import { useEffect } from 'react';

const Info = () => {
  const userData = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-white text-xl font-semibold'>Your Information:</p>
      <ul className='flex flex-col gap-1 text-white'>
        <li className='bg-lime-800 border-2 border-white rounded-sm px-2 py-1'>
          <span className="text-sm font-semibold">Your Email: </span>
          <span className='text-md font-semibold'>{userData.email}</span>
        </li>

        <li className='bg-lime-800 border-2 border-white rounded-sm px-2 py-1'>
          <span className="text-sm font-semibold">Your Password: </span>
          <span className='text-md font-semibold'>{userData.password}</span>
        </li>
      </ul>

      <div className='flex gap-4'>
        <button className='hover:underline hover:cursor-pointer border-2 border-white rounded-md  px-2 py-1 text-sm text-white font-semibold bg-lime-950' onClick={()=>{
          dispatch(updateOn());
        }}>Update Profile</button>

        <button onClick={()=>{
          dispatch(logOut());
          }} className='hover:underline hover:cursor-pointer border-2 border-white rounded-md  px-2 py-1 text-sm text-white font-semibold bg-lime-950'>Log Out</button>
      </div>
    </div>
  )
}

const Input = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting, isValid, isDirty},
  } = useForm();

  const onSubmit = (info) => {
    dispatch(logIn(info));
    reset();
  }

  return (
    <div className='border-2 border-white rounded-md flex flex-col gap-4 p-4 items-center bg-lime-950'>
      <p className='text-white text-xl font-semibold'>Enter Your Information:</p>
      <form action="" className='flex flex-col gap-2 items-center' onSubmit={handleSubmit(onSubmit)}>
        <input type="email" className='border-2 border-white bg-lime-700 rounded-md px-2 py-1 w-[300px] outline-0 text-white text-sm font-semibold' placeholder='Enter your email' {...register("email", {
          required: {value:true, message:"This field is required."},
        })}/>
        {errors.email && <p className='text-red-700 text-sm font-semibold'>{errors.email.message}</p>}

        <input type="password" className='border-2 border-white bg-lime-700 rounded-md px-2 py-1 w-[300px] outline-0 text-white text-sm font-semibold' placeholder='Enter Password'
        {...register("password", {
          required: {value:true, message:"This field is required."},
        })}/>
        {errors.password && <p className='text-red-700 text-sm font-semibold'>{errors.password.message}</p>}

        <input type="submit" className='text-white border-2 border-white rounded-md px-2 py-0.5 bg-lime-900 font-semibold'/>
      </form>
    </div>
  )
}

const Update = () => {
  const dispatch = useDispatch();
  const updateMode = useSelector((state) => state.updateProfile);
  const userData = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isSubmitting, isValid, isDirty},
  } = useForm();

  const onSubmit = (info) => {
    dispatch(logIn(info));
    dispatch(updateOff());
    reset();
  }

  useEffect(() => {
    if(updateMode.isUpdateModeOn){
      setValue("email", userData.email);
      setValue("password", userData.password);
    }
  }, [updateMode])

  return (
    <div className='border-2 border-white rounded-md flex flex-col gap-4 p-4 items-center bg-lime-950'>
      <p className='text-white text-xl font-semibold'>Update Your Information:</p>
      <form action="" className='flex flex-col gap-2 items-center' onSubmit={handleSubmit(onSubmit)}>
        <input type="email" className='border-2 border-white bg-lime-700 rounded-md px-2 py-1 w-[300px] outline-0 text-white text-sm font-semibold' {...register("email", {
          required: {value:true, message:"This field is required."},
        })}/>
        {errors.email && <p className='text-red-700 text-sm font-semibold'>{errors.email.message}</p>}

        <input type="password" className='border-2 border-white bg-lime-700 rounded-md px-2 py-1 w-[300px] outline-0 text-white text-sm font-semibold' {...register("password", {
          required: {value:true, message:"This field is required."},
        })}/>
        {errors.password && <p className='text-red-700 text-sm font-semibold'>{errors.password.message}</p>}

        <button className='text-white border-2 border-white rounded-md px-2 py-0.5 bg-lime-900 font-semibold'>Update</button>
      </form>
    </div>
  );
}

const LogIn = () => {
  const userData = useSelector((state) => state.auth);
  const updateMode = useSelector((state) => state.updateProfile);
  return (
    <>
      {
        userData.loggedIn ?
        (
          updateMode.isUpdateModeOn ? <Update/> : <Info/>
        )
        : <Input/>
      }
    </>
  );
}


export default LogIn
