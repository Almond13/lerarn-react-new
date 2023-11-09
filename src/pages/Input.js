import React, {useState} from "react";

const Input = () => {
    const [textValue, setTextValue] =useState("");

    const changeValue =  (e) => {
        setTextValue(e.target.value)
    };

    return (
        <div>
            <input type="text" value={textValue} onChange={changeValue} />
            <br/>
            <p>{textValue}</p>
        </div>
    );
};

export default Input;
