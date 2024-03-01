
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Signup } from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';

import Users from './components/Users';


function App() {

  return (
    <div className='h-screen w-full flex items-center justify-center bg-black '>
      <BrowserRouter>
      <Routes>

    {/* <Route path='/' element={<Signup/>} >
   
    </Route>
    <Route  path='/signin' element={<Signin/>}/> */}
    <Route path='/dashboard' element={<Dashboard/>}/>
    {/* <Route path='/send' element={<SendMoney/>}/> */}
     
       </Routes> 
     
       </BrowserRouter>

       
    </div>
  )
}

export default App
