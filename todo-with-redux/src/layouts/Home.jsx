import { useSelector, useDispatch } from 'react-redux'
import {toggleFinish, updateTodo, removeTodo, addTodo} from "../features/todoSlice";
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

const TodoBox = ({todo, isUpdateModeOn, setIsUpdateModeOn, setUpdateIndex, updateIndex}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.todos);

  const handleUpdate = (id) => {
    const index = data.todos.findIndex((todo) => {
      return id === todo.id;
    });
    setUpdateIndex(index);
    setIsUpdateModeOn(true);
  }

  return (
    <div className='border-2 border-white bg-lime-800 rounded-md p-2 flex flex-col gap-2'>
      <p className='text-white text-md font-semibold'>{todo.description}</p>
      <div className='flex justify-between'>
        <button className='text-white text-sm font-semibold hover:cursor-pointer hover:underline border-2 border-white rounded-md px-2 py-0.5 bg-lime-950' onClick={() => {
            dispatch(toggleFinish(todo));
          }}>
          {todo.isFinished ? "Finished" : "Not Finished"}
        </button>

        <span className='flex gap-3'>
          <button className='text-white text-sm font-semibold hover:cursor-pointer hover:underline border-2 border-white  rounded-md px-2 py-0.5 bg-lime-950' onClick={()=>{handleUpdate(todo.id)}}>Edit</button>
          <button className='text-white text-sm font-semibold hover:cursor-pointer hover:underline border-2 border-white  rounded-md px-2 py-0.5 bg-lime-950' onClick={() => {
            dispatch(removeTodo(todo));
          }}>Delete</button>
        </span>
      </div>
    </div>
  )
}


const Home = () => {
  const [isUpdateModeOn, setIsUpdateModeOn] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);

  const data = useSelector((state) => state.todos);

  const {
      register,
      handleSubmit,
      reset,
      setValue,
      formState: {errors, isSubmitting, isValid, isDirty},
    } = useForm();

  useEffect(() => {
    if(isUpdateModeOn){
      const value = data.todos[updateIndex].description;
      setValue("todo", value);
    }
  }, [isUpdateModeOn])

  const dispatch = useDispatch();

    const onSubmit = (data) => {
      dispatch(addTodo({description: data.todo}));
      reset();
    }

    const updateSubmit = (info) => {
      dispatch(updateTodo({id: data.todos[updateIndex].id, description: info.todo, isFinished: data.todos[updateIndex].isFinished}));
      reset();
      setIsUpdateModeOn(false);
    }

  return (
    <>
      <form action="" onSubmit={isUpdateModeOn ? handleSubmit(updateSubmit) : handleSubmit(onSubmit)} className='flex gap-2'>
        <input type="text" className='border-2 border-white bg-lime-700 rounded-md px-2 py-1 w-full outline-0 text-white text-sm font-semibold' {...register("todo", {
          required: {value:true, message:"This field is required."},
        })} placeholder='Enter todo here'/>
        <button className='text-white border-2 border-white rounded-md px-2 py-0.5 bg-lime-900 font-semibold shrink-0'>{isUpdateModeOn ? "Update Todo" : "Add Todo"}</button>
      </form>

      {data.todos.map((todo)=>{
        return <TodoBox key={todo.id} todo={todo} isUpdateModeOn={isUpdateModeOn} setIsUpdateModeOn={setIsUpdateModeOn} updateIndex={updateIndex} setUpdateIndex={setUpdateIndex}/>;
      })}
    </>
  )
}

export default Home
