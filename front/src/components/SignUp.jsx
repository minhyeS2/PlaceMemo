import React from 'react'

const SignUp = () => {

    return (
        <div className='signUp-total'>
            <div><span>Sign UP</span></div>
            <div className='signUp'>
                <div className='id-input'>
                    <input/>
                </div>
                <div className='nickname-input'>
                    <span>nickname</span>
                    <input/>
                </div>
                <div className='pw-input'>
                    <span>PW</span>
                    <input type="password" />
                </div>
                <div className='pw-check-input'>
                    <input type="password" />
                </div>
                <button>Sign UP</button>
            </div>
        </div>
    );
};

export default SignUp;



