import './Login.css';
import { parseJwt } from '../utils/parseJwt.js';
import React, { useEffect, useState } from 'react';

const Login = ({ setActiveMenu, setIsLoggedIn, setNickname }) => {
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

        const payload = parseJwt(data.token);
        if (payload?.nickname) {
          setNickname(payload.nickname);
        }
        setIsLoggedIn(true);

        console.log('token使用可能！');
      }
    } catch (error) {
      console.error(error);
      alert('Error');
    }
  };

  const checkHandle = () => {
    setIdMessage(id.trim() === "" ? "IDを入力してください。" : "");
    setPasswordMessage(password.trim() === "" ? "パスワードを入力してください。" : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 엔터 시 새로고침 방지
    loginHandle();
  };

  return (
    <div className='login-total'>
      <form className='login' onSubmit={handleSubmit}>
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
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className='pw'>
          <span>PW</span>
          <div
            className="input-message"
            style={{ color: passwordMessage.includes("可能") ? "green" : "red" }}
          >
            {passwordMessage}
          </div>
        </div>
        <div className='pw-input'>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className='login-btn' type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
