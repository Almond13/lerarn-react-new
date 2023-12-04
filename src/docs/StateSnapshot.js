import React from 'react'
import { useState } from 'react'

// Setting state triggers renders
// 상태 업데이트 시 다시 렌더링이 트리거 됨
const Form = () => {
  const [isSent, setIsSent] = useState(false)
  const [message, setMessage] = useState('Hi!')
  if (isSent) {
    return <h1>Your message is on its way!</h1>
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setIsSent(true)
        sendMessage(message)
      }}
    >
      <h1>Setting state triggers renders</h1>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button>Send</button>
    </form>
  )
  function sendMessage(message) {
    console.log(message)
  }
}

// Rendering takes a snapshot in time
// setNumber(number+1)을 세 번 호출하더라도 현재 렌더링에 대한 이벤트 핸들러 안에서 이뤄지기 때문에 모두 같은 렌더링의 상태 값을 사용
// setNumber 함수가 호출되면 React는 즉시 업데이트하지 않고 다음 렌더링이 발생할 때 업데이트함
const Counter = () => {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>Rendering takes a snapshot in time</h1>
      <h2>{number}</h2>
      <button
        onClick={() => {
          setNumber(number + 1)
          setNumber(number + 1)
          setNumber(number + 1)
        }}
      >
        +3
      </button>
    </>
  )
}

// State over time
// 이벤트 헨들러의 코드가 비동기적이라도 상태 변수의 값은 렌더링 내에서 절대 변경되지 않음
// React가 컴포넌트를 호출하여 UI의 스냅샷을 캡처할 때 상태 변수의 값은 이미 고정되어 있음
const TimeCounter = () => {
  const [number, setNumber] = useState(0)
  return (
    <>
      <h1>State over time</h1>
      <h2>{number}</h2>
      <button
        onClick={() => {
          setNumber(number + 5)
          setTimeout(() => {
            alert(number)
          }, 3000)
        }}
      >
        +5
      </button>
    </>
  )
}

// 버튼 이벤트(handleClick)를 클릭하고 알림창이 떠도 상태는 변하지 않음, 렌더링이 된 후에야 상태가 변함
const TrafficLight = () => {
  const [walk, setWalk] = useState(true)

  function handleClick() {
    setWalk(!walk)
    alert(walk ? 'Stop is next' : 'Walk is next')
  }
  return (
    <>
      <h1>Implement a traffic light</h1>
      <button onClick={handleClick}>Change to {walk ? 'Stop' : 'Walk'}</button>
      <h2 style={{ color: walk ? 'darkgreen' : 'darkred' }}>{walk ? 'Walk' : 'Stop'}</h2>
    </>
  )
}

const StateSnapshot = () => {
  return (
    <div>
      <Form />
      <br />
      <Counter />
      <br />
      <TimeCounter />
      <br />
      <TrafficLight />
    </div>
  )
}
export default StateSnapshot
