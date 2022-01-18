import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import OnlineUsers from './components/OnlineUsers';
import Sidebar from './components/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import Create from './pages/create/Create';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';

import Project from './pages/project/Project';
import Signup from './pages/signup/Signup';

function App() {
  const {user,authIsReady}=useAuthContext()
  
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
        {user && <Sidebar/>}
        <div className='container'>
        <Navbar></Navbar>
          <Routes>
            <Route path='/' element={
              user? <Dashboard/>:<Navigate to='/login'></Navigate>
            }></Route>

            <Route path='/create' element={
             user? <Create/>:<Navigate to='/login'></Navigate>
            }></Route>

            <Route path='/login' element={
             !user? <Login/>:<Navigate to='/'></Navigate>
            }></Route>

            <Route path='/projects/:id' element={
             user? <Project/>:<Navigate to='/login'></Navigate>
            }></Route>
            <Route path='/signup' element={
                !user? <Signup/>:<Navigate to='/'></Navigate>
            }
            ></Route>
            <Route path="*" element={
              <Navigate to='/login'></Navigate>
            }></Route>
          </Routes>
          </div>
          {user && <OnlineUsers/>}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
