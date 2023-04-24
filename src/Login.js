import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import { HelmetProvider  } from 'react-helmet-async';
import './login.css';

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
 let user=null;
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://5lc6fv1o56.execute-api.eu-central-1.amazonaws.com/routing/authenticate/login', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, user=username);
      props.history.push('/dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <HelmetProvider>
      <title>My Website</title>
      <link rel="stylesheet" href="login.css" />
    <div className="sign-up">
         <div className="circle circle--red"></div>
         <div className="circle circle--yellow"></div>
         <div className="circle circle--green"></div>
         <div className="circle circle--purple"></div>
    <form className="sign-up__form">
    <div className="sign-up__content">
        <h2 className="sign-up__title">Login</h2>
        <input className="sign-up__inp" type="text" {...username} placeholder='Username' required="required"/>
        <input className="sign-up__inp" {...password} type="password" placeholder="Password" required="required"/><a className="forgot__password">Forgot your password</a>     
    </div>
      <div className='Error'>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      </div>
      <input className="btn btn--signin" type="submit" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </form>
    </div>
    </HelmetProvider>
    // <>
    // <HelmetProvider>
       
    //     <title>My Website</title>
    //     <link rel="stylesheet" href="login.css" />
    //       <div className="sign-up">
    //           <div className="circle circle--red"></div>
    //           <div className="circle circle--yellow"></div>
    //           <div className="circle circle--green"></div>
    //           <div className="circle circle--purple"></div>
    //           <form onSubmit={handleLogin} className="sign-up__form">
    //             <div className="sign-up__content">
    //               <h2 className="sign-up__title">Login</h2>
    //               <input className="sign-up__inp" type="text" placeholder='Username' required="required" {...username}/>
    //               <input className="sign-up__inp" type="password" placeholder="Password" required="required" {...password}/><a className="forgot__password">Forgot your password</a>
    //             </div>
    //             <div className="sign-up__buttons"><a className="btn btn--register" href="#register">Register</a>
    //               <button className="btn btn--signin" type="submit">Sign in</button>
    //             </div>
    //           </form>
    //       </div> 
    //       </HelmetProvider>
    // </>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;