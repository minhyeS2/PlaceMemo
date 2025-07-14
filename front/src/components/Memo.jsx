import React from 'react'

const Memo = ({ detail }) => {
    const token = localStorage.getItem('token');
    console.log(token)
    console.log(JSON.stringify(detail));
    console.log(detail.id);

    const [memoText, setMemoText] = React.useState('');

    const memoHandle = async() => {
        try {
            const response = await fetch('http://localhost:8081/creatememo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    memoText: memoText,
                    placeId: detail.id,
                })
            });
            const data = await response.json();
            alert(data.message)
        } catch (error) {
            console.error(error);
            alert('Error');
        }
    }




    return (
        <div className='detail-memo-total'>
            <div>
                <textarea value={memoText} onChange={(e) => setMemoText(e.target.value)}></textarea>
            </div>
            <div>마크 커스텀 선택창</div>
            <button onClick={memoHandle}>保存</button>
        </div>
    )
}

export default Memo