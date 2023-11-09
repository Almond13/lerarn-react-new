import React, {useState} from "react";

const Input2 = () => {
    const [inputs, setInputs] =useState({
        name : "",
        email : "",
        tel : ""
    });

    const {name, email, tel} = inputs;

    const changeValue =  (e) => {
        const value = e.target.value;
        const id = e.target.id;

        // inputs[id] = value;
        // 위와 같이 하면 상태 관리가 안되므로 SetIputs을 사용한다.
        setInputs({
            ...inputs,
            [id] : value
            // name : value 로 생각하면 된다.
        })
    };

    return (
        <div>
            <div>
                <label>이름</label>
                <input type="text" id="name" value={name} onChange={changeValue}/>
            </div>
            <div>
                <label>이메일</label>
                <input type="text" id="email" value={email} onChange={changeValue}/>
            </div>
            <div>
                <label>전화번호</label>
                <input type="text" id="tel" value={tel} onChange={changeValue}/>
            </div>
            <p>이름 : {name}</p>
            <p>이메일 : {email}</p>
            <p>전화번호 : {tel}</p>
        </div>
    );
};

export default Input2;
