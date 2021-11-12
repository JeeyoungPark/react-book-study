import React, { useState, useRef } from 'react';

function InputSample() {
  const [inputs, setInputs] = useState({
    name: '',
    age: null,
  });

  const nameInput = useRef();

  const { name, age } = inputs;

  const onChange = (e) => {
    const {value, name} = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  const onReset = () => {
    setInputs({
      ...inputs,
      name: '',
      age: '',
    });

    nameInput.current.focus();
  }

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput} />
      <input
        name="age"
        placeholder="나이"
        onChange={onChange}
        value={age} />

      <button onClick={onReset}>초기화</button>

      <div>
        <b>값: {name} / {age}</b>
      </div>
    </div>
  );
}

export default InputSample;