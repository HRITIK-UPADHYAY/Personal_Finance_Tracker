import { Route, Routes } from 'react-router-dom';
import './App.css'
import SignInORSignUp from './Components/Page/SingnInORSignUp'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
import Dashboard from './Components/Page/Dashboard';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<SignInORSignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>    
  )
}

export default App
