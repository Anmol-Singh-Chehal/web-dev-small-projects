import React from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Input from './components/Input'

const App = () => {

  return (
    <main className='flex flex-col gap-6'>
      <Navbar/>
      <Input/>
    </main>
  )
}

export default App
