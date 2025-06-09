import './App.css';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  
  return (
    <>
      <div className='flex flex-col gap-6'>
        <Navbar/>
        <Outlet/>
      </div>
    </>
  );
}

export default App
