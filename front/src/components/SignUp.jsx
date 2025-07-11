import React, { useEffect, useState } from 'react';

const SignUp = () => {
    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const signUpHandle = async () => {
        // 예: 회원가입 API 호출
        try {
            const response = await fetch('http://localhost:8081/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: id, nickname: nickname, password: password })
            });
            const data = await response.text();
            alert(data); // 응답 메시지 표시
        } catch (error) {
            console.error(error);
            alert('Error');
        }
    };


    return (
        <div className='signUp-total'>
            <div><span>Sign UP</span></div>
            <div className='signUp'>
                <div className='id-input'>
                    <span>ID</span>
                    <input value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className='nickname-input'>
                    <span>nickname</span>
                    <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
                <div className='pw-input'>
                    <span>PW</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='pw-check-input'>
                    <span>PW check</span>
                    <input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
                </div>
                <button onClick={signUpHandle}>Sign UP</button>
            </div>
        </div>
    );
};

export default SignUp;



