import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import { HelmetProvider } from 'react-helmet-async';
import './login.css';

function Home(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  let user = null;

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('https://5lc6fv1o56.execute-api.eu-central-1.amazonaws.com/routing/authenticate/RegisterAdmin', 
      { 
        username: username.value, 
        email: email.value,
        password: password.value 
      })
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
            <h2 className="sign-up__title">RegisterAdmin</h2>
            <input className="sign-up__inp" type="text" {...username} placeholder='Username' required="required" />
            <input className="sign-up__inp" type="email" {...email} placeholder='Email' required="required" />
            <input className="sign-up__inp" {...password} type="password" placeholder="Password" required="required" />
          </div>
          <input className="btn btn--signin" type="submit" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
        </form>
      </div>
    </HelmetProvider>
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

export default Home;