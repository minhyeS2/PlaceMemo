import React from 'react'

const Login = () => {

  return (
    <div className='login-total'>
      <div><span>Login</span></div>
      <div className='login'>
        <div className='id-input'>
          <span>ID</span>
          <input />
        </div>
        <div className='pw-input'>
          <span>PW</span>
          <input type="password" />
        </div>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Login