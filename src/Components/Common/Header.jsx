import React, { useEffect } from 'react'
import './Style/header.css'
import { auth } from '../../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import altImg from '../../Assets/altImg.png'

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(()=> {
    if(user) navigate("/dashboard");
  }, [user, loading])

  async function logout(e) {
    e.preventDefault();
    try {
      signOut(auth)
      .then(() => {
        toast.success("Logout Succesffully!");
        navigate("/");
      })
      .catch()
    } catch (error) {
      toast.error(error.message);   
    }
  }

  return (
    <div className='header'>
      <p> Financly. </p>
      {user && <div className='right'>
                  <img src={user.photoURL ? user.photoURL : altImg}/>
                  <p onClick={logout}> Logout </p> 
                </div>
      }
    </div>
  )
}

export default Header
