import './Login.css';

import React, { useEffect, useState } from 'react'

const Login = ({ setActiveMenu }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    checkHandle();
  }, [id, password]);

  const loginHandle = async () => {
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: id, password })
      });
      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        setActiveMenu('search');
        localStorage.setItem('token', data.token);
      }

      console.log('token使用可能！');
    } catch (error) {
      console.error(error);
      alert('Error');
    }
  };

  const checkHandle = (e) => {
    if (id.trim() === "") {
      setIdMessage("IDを入力してください。");
    } else {
      setIdMessage("");
    }

    if (password.trim() === "") {
      setPasswordMessage("パスワードを入力してください。");
    } else {
      setPasswordMessage("");
    }

  };


  return (
    <div className='login-total'>
      <div className='login'>
      <div className='page-name'><span>LOGIN</span></div>
        <div className='id'>
          <span>ID</span>
          <div
            className="input-message"
            style={{ color: idMessage.includes("可能") ? "green" : "red" }}
          >
            {idMessage}
          </div>
        </div>
        <div className='id-input'>
          <input value={id} onChange={(e) => setId(e.target.value)}></input>
        </div>
        <div className='pw'>
          <span>PW</span>
          <div
            className="input-message"
            style={{ color: idMessage.includes("可能") ? "green" : "red" }}
          >
            {passwordMessage}
          </div>
        </div>
        <div className='pw-input'>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <button 
        className='btn'
        onClick={loginHandle}>Login</button>
      </div>
    </div>
  )
}

export default Login