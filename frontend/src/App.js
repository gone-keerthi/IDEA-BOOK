import React from 'react'
import Login from './Components/Authentications/Login.jsx';
import SignUp from './Components/Authentications/SignUp.jsx';
import{BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './Components/DashboardPage/Dashboard.jsx';


const App = () => { 

  return (
    
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element = { <SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard-page' element ={ <Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App