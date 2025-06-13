import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {increment, decrement, fetchCard} from "../slices/countSlice"
import {
  useGetPokemonByCountQuery,
  useGetPokemonByNameQuery,
  useLazyGetPokemonByCountQuery,
  useLazyGetPokemonByNameQuery,
} from "../api/pokemonApi";
import {useUpdatePokemonMutation} from "../api/pokemonMutationApi"

const PokemeonCard = ({name, id, height, pokeImage}) => {
return (
  <>
      <div className='border-2 border-amber-500 rounded-md flex flex-col items-center bg-amber-950'>
        <p className='text-amber-950 text-md font-semibold bg-amber-500 min-w-[140px] text-center'>{name}</p>
        <img src={pokeImage} alt="pokemon" />
        <div className='flex px-2 gap-2 bg-amber-500 min-w-[140px]'>
          <span className='flex gap-1'>
            <span className='text-amber-950 text-md font-semibold bg-amber-500 underline'>Id:</span>
            <span className='text-amber-950 text-md font-semibold bg-amber-500'>{id}</span>
          </span>
          <span className='flex gap-1'>
            <span className='text-amber-950 text-md font-semibold bg-amber-500 underline'>Height:</span>
            <span className='text-amber-950 text-md font-semibold bg-amber-500'>{height}</span>
          </span>
        </div>
      </div>
    </>
  )
}

const CountInput = () => {
  const dispatch = useDispatch();
  const count = useSelector((state)=>state.countSlice.count);
  const pokeData = useSelector((state) => state.countSlice);
  const [fetchMany, setFetchMany] = useState(false);
  const [updatePokemon] = useUpdatePokemonMutation();

  const [
    fetchPokemonByCount,
    {data, isLoading, error}
  ] = useLazyGetPokemonByCountQuery();

  useEffect(()=>{
    dispatch(fetchCard());
  }, []);

  const startPolling = () => {
    setInterval(() => {
      fetchPokemonByCount(count);
    }, 2000);
  }

  const handleButton = async () => {
    if(count === 1){
      setFetchMany(false);
      dispatch(fetchCard());
      // try{
      //   const response = await updatePokemon({id: 1, name:"pikachu", color:"amber"});
      //   console.log("Updated successfully!", response);
      // }catch(error){
      //   console.error("update failed: ", error);
      // }
    }else{
      setFetchMany(true);
      fetchPokemonByCount(count);
      // startPolling();
    }
  }

  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <div>
        <button className='text-amber-950 bg-amber-500 border-2 border-amber-950 text-lg font-bold rounded-l-md px-2 cursor-pointer' onClick={()=>dispatch(increment())}>+1</button>
        <button className='text-amber-950 bg-amber-500 border-2 border-amber-950 text-lg font-bold px-2 min-w-[60px] text-center'>{count}</button>
        <button className='text-amber-950 bg-amber-500 border-2 border-amber-950 text-lg font-bold rounded-r-md px-2.5 cursor-pointer' onClick={()=>dispatch(decrement())}>-1</button>
      </div>

      <button className='text-amber-500 font-semibold text-lg hover:cursor-pointer border-2 rounded-md px-2 py-0.5 bg-amber-950 hover:bg-amber-500 hover:text-amber-950 hover:border-amber-950' onClick={handleButton}>Get Pokémons</button>

      <div className='flex gap-1 flex-wrap scroll-auto border-4 justify-center border-amber-500 rounded-md p-2'>
      { 
        (fetchMany === false) ?
       ((pokeData.status === "loading") ? <p className='text-amber-500 text-sm font-semibold'>Loading...</p>
        : (pokeData.status === "failed") ? <p className='text-red-600 text-sm font-semibold'>Oops, Check Internet please!</p> : (pokeData.status == "succeeded" && pokeData.card.pokeImage !== null) && <PokemeonCard id={pokeData.card.id} name={pokeData.card.name} pokeImage={pokeData.card.pokeImage} height={pokeData.card.height}/>)

        : 

        ((isLoading) ? <p className='text-amber-500 text-sm font-semibold'>Loading...</p> 
        : (error) ? <p className='text-red-600 text-sm font-semibold'>Oops, Check Internet please!</p>
        : (data) && data.map((pokemon)=>{
          return <PokemeonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} height={pokemon.height} pokeImage={pokemon.pokeImage}/>
        }))
      }
      </div>
    </div>
  )
}

const NameInput = ({pokeName, setPokeName}) => {
  const [
    fetchPokemon,
    {data, isLoading, error},
  ] = useLazyGetPokemonByNameQuery();
  
  const handleButton = () => {
    fetchPokemon(pokeName);
    setPokeName("");
  }
  
  return (
    <>
      <input type="text" className='text-amber-500 text-md font-semibold outline-0 rounded-md border-2 border-amber-500 px-2 py-0.5 w-[300px]' onChange={(event)=>setPokeName(event.target.value)} value={pokeName} placeholder='Enter name here...'/>
      <button className='text-amber-500 font-semibold text-lg hover:cursor-pointer border-2 rounded-md px-2 py-0.5 bg-amber-950 hover:bg-amber-500 hover:text-amber-950 hover:border-amber-950' onClick={handleButton}>Get Pokémons</button>

      {
        (isLoading === true) ? <p className='text-amber-500 text-sm font-semibold'>Loading...</p>
        : (error != null) ? <p className='text-red-600 text-sm font-semibold'>Oops, Check Name or Internet Please!</p>
        : (data && data.pokeImage != null) && <PokemeonCard name={data.name} id={data.id} height={data.height} pokeImage={data.pokeImage}/>
      }
    </>
  )
}

const Input = () => {
  const [getBy, setGetBy] = useState("count");
  const [pokeName, setPokeName] = useState("");

  return (
    <div className='flex flex-col gap-2 items-center'>
      <div>
        <button className={(getBy === "count") ? "active-left" : "not-active-left"} onClick={()=>setGetBy("count")}>Enter Count:</button>
        <button className={(getBy === "name") ? "active-right" : "not-active-right"} onClick={()=>setGetBy("name")}>Enter Name:</button>
      </div>

      {
        (getBy === "count") ? <CountInput/>
        : <NameInput pokeName={pokeName} setPokeName={setPokeName}/>
      }

    </div>
  )
}

export default Input;
