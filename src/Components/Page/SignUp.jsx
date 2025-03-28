import React, { useState } from 'react'
import Header from '../Common/Header'
import './Style/signUp.css'
import Button from '../Common/Button';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className='signup'>
      <Header text={"Dashboard"}/>
      <div className='container'>
        <div className="signup-container">
          <p> Sign Up On <span style={{color:"var(--blue)"}}> Financely. </span></p>
          <form className='form'>
            <div className="input-data">
              <label> Full Name </label>
              <input type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="input-data">
              <label> Email </label>
              <input type='text' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-data">
              <label> Password </label>
              <input type='password' placeholder='Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-data">
              <label> Confirm Password </label>
              <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <div className="btn">
              <Button text={"Signup With Email"} outlined={true}/>
              <p> Or </p>
              <Button text={"Signup With Google"} outlined={false} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp