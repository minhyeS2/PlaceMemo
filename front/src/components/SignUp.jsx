import './signUp.css';

import React, { useEffect, useState } from 'react';

const SignUp = ({ setActiveMenu }) => {

    const [id, setId] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [idMessage, setIdMessage] = useState('');
    const [nicknameMessage, setNicknameMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    useEffect(() => {
        checkHandle();
    }, [id, nickname, password, passwordCheck]);

    const signUpHandle = async () => {
        // 예: 회원가입 API 호출
        try {
            const response = await fetch('http://localhost:8081/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: id, nickname: nickname, password })
            });
            const data = await response.text();
            alert(data); // 응답 메시지 표시

            if (response.ok) {
                setActiveMenu('login');
            }

        } catch (error) {
            console.error(error);
            alert('Error');
        }
    };

    const checkHandle = (e) => {
        if (id.trim() === "") {
            setIdMessage("IDを入力してください。");
        } else if (id.length < 4 || id.length > 20) {
            setIdMessage("IDは4～20文字で入力してください。");
        } else {
            setIdMessage("");
            fetch(`http://localhost:8081/check-id?userId=${id}`)
                .then(res => res.text())
                .then(msg => setIdMessage(msg))
                .catch(() => setIdMessage("エラーが発生しました"));
        }

        if (nickname.trim() === "") {
            setNicknameMessage("ニックネームを入力してください。");
        } else if (nickname.length < 2 || nickname.length > 10) {
            setNicknameMessage("ニックネームは2～10文字で入力してください。");
        } else {
            setNicknameMessage("");
        }

        if (password.trim() === "") {
            setPasswordMessage("パスワードを入力してください。")
        } else if (password.length < 6 || password.length > 20) {
            setPasswordMessage("パスワードは6～20文字で入力してください。");
        } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
            setPasswordMessage("パスワードは英字と数字を含めてください。");
        } else if (password !== passwordCheck) {
            setPasswordMessage("パスワードが一致しません。");
        } else {
            setPasswordMessage("");
        }

    };


    return (
        <div className='signUp-total'>
            <div className='signUp'>
            <div className='page-name'><span>SIGN UP</span></div>
                <div className='signUp-id'> 
                    <span>ID</span>
                    <div
                        className="input-message"
                        style={{ color: idMessage.includes("可能") ? "green" : "red"}}
                    >
                        {idMessage}
                    </div>
                </div>  
                <div className='signUp-id-input'>
                    <input value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className='nickname'>
                    <span>Nickname</span>
                    <div
                        className="input-message"
                        style={{ color: nicknameMessage.includes("可能") ? "green" : "red"}}
                    >
                        {nicknameMessage}
                    </div>
                </div>
                <div className='nickname-input'>
                    <input value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
                <div className='signUp-pw'>
                    <span>PW</span>
                    <div
                        className="input-message"
                        style={{ color: passwordMessage.includes("可能") ? "green" : "red"}}
                    >
                        {passwordMessage}
                    </div>
                </div>
                <div className='signUp-pw-input'>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='pw-check'>
                    <span>PW Check</span>
                    <div
                        className="input-message"
                        style={{ color: passwordMessage.includes("可能") ? "green" : "red"}}
                    >
                        {passwordMessage}
                    </div>
                </div>
                <div className='pw-check-input'>
                    <input type="password" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
                </div>
                <button 
                className='signUp-btn'
                onClick={signUpHandle}>Sign UP</button>
            </div>
        </div>
    );
};

export default SignUp;



