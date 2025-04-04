import React, { useState } from 'react'
import Header from '../Common/Header'
import './Style/signUp.css'
import Button from '../Common/Button';
import userAuthentication from '../../Functions/userAuthentication';
import { toast } from 'react-toastify';
import { auth, db, doc, provider, setDoc } from '../../Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { useNavigate } from 'react-router-dom';

const SignInORSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [clicked, setClicked] = useState("signUp");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    if(clicked === 'signUp') {
      document.getElementById("signUp").style.display = 'none';
      document.getElementById("signIn").style.display = 'flex';
      setClicked("signIn");
    }
    else {
      document.getElementById("signIn").style.display = 'none';
      document.getElementById("signUp").style.display = 'flex';
      setClicked("signUp");
    }

    formEmpty();
  }

  function signUpWithEmail(e) {
    e.preventDefault();
    setLoading(true);

    userAuthentication(name, email, password, confirmPassword, false)
    .then(res => {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("User Created");
        navigate("/dashboard");
        createDoc(user);
        formEmpty();  
      })
      .catch((error) => {
        toast.error(error);
        formEmpty();
      });
    })
    .catch(err => {
      toast.error(err);
      formEmpty();
    });
  }

  function signInWithEmail(e) {
    e.preventDefault();
    setLoading(true);

    userAuthentication(name, email, password, confirmPassword, true)
    .then(res => {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Logged In");
        navigate("/dashboard");
        console.log(user);
        formEmpty();  
      })
      .catch((error) => {
        toast.error(error);
        formEmpty();
      });
    })
    .catch(err => {
      toast.error(err);
      formEmpty();
    });
  }

  async function createDoc(user) {
    if(!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if(!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName: name,
          email: user.email,
          photoUrl: user.photoURL ? user.photoURL : "",
          createdAt: new Date()
        });
      } catch (error){
        toast.error(error.message)
      };
    }
  }

  async function signUpWithGoggle(e) {
    e.preventDefault();
    setLoading(true);
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      toast.success("User Authenticated");
      navigate("/dashboard");
      createDoc(user);
      setLoading(false);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      setLoading(false);
    });
  }

  function formEmpty() {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLoading(false);
  }

  return (
    <div className='signupOrSignIn'>
      <Header />
      <div className='container'>

        <div className="signup-container" id='signUp'>
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
              <Button text={"Signup With Email"} outlined={true} onClick={signUpWithEmail} loading={loading}/>
              <p onClick={signUpWithEmail}> Or </p>
              <Button text={"Signup With Google"} outlined={false} loading={loading} onClick={signUpWithGoggle}/>
            </div>
            <p> Already Have an Account? <span style={{color: "var(--blue)"}} onClick={handleClick}> Click Here </span> </p>
          </form>
        </div>

        <div className="signin-container" id='signIn'>
          <p> Log In On <span style={{color:"var(--blue)"}}> Financely. </span></p>
            <form className='form'>
              <div className="input-data">
                <label> Email </label>
                <input type='text' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-data">
                <label> Password </label>
                <input type='password' placeholder='Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="btn">
                <Button text={"Login With Email"} outlined={true} onClick={signInWithEmail} loading={loading}/>
                <p> Or </p>
                <Button text={"Login With Google"} outlined={false} loading={loading} onClick={signUpWithGoggle}/>
              </div>
              <p> Dont't Have an Account? <span style={{color: "var(--blue)"}} onClick={handleClick}> Click Here </span> </p>
            </form>
        </div>

      </div>
    </div>
  )
}

export default SignInORSignUp