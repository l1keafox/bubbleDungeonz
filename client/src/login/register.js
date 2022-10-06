
import React, { useEffect, useRef } from "react";


function handleRegistrationForm(email,username,password) {
    

    fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        username,username,
        password: password,
      }),
    })
  }


  function RegisterElement() {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const usernameInputRef = useRef();
    return (
      <div className="register">
        <form>
          <input style={{ padding: '15px', borderRadius: '10px', margin: '10px' }} ref={emailInputRef} type='email' placeholder='Email' />
          <input style={{ padding: '15px', borderRadius: '10px', margin: '10px' }} ref={usernameInputRef} type='username' placeholder='Username' />
          <input style={{ padding: '15px', borderRadius: '10px', margin: '10px' }} ref={passwordInputRef} type='password' placeholder='Password' />
          <button
            type='submit'
            style={{ padding: '15px', borderRadius: '10px', margin: '10px' }}
            onClick={e => {
              e.preventDefault();
              handleRegistrationForm(emailInputRef.current.value,usernameInputRef.current.value,passwordInputRef.current.value);
            }}>
            Register
          </button>
        </form>
      </div>
    );
  }

  export default RegisterElement;