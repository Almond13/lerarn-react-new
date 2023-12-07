import React, { useState } from 'react'

// Updating the same state multiple times before the next render
// 동일한 상태 변수를 다음 렌더링 전에 여러번 업데이트하려는 경우에 사용
// n => n+1을 업데이트 함수라고 할 수 있음
// 일반적인 setNumber(newValue)와 같은 형태 대신에 setNumber(previousState => newState)의 형태를 사용함으로써 이전 상태를 기반으로 새로운 상태를 계산하는 함수를 제공
// 이 함수를 대기열(큐)에 넣고 다음 렌더링동안 대기열을 거쳐 최종 업데이트된 상태를 제공함
const Counter = () => {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>Updating the same state multiple times before the next render</h1>
      <h2>{number}</h2>
      <button
        onClick={() => {
          setNumber((n) => n + 1)
          setNumber((n) => n + 1)
          setNumber((n) => n + 1)
        }}
      >
        +3
      </button>
    </>
  )
}

// What happens if you update state after replacing it
// number + 5 : 현재 상태(number)에 5를 더한 값을 새로운 상태로 대체
// n => n + 1 : 이전 상태(n)를 받아와서 1을 더한 값을 새로운 상태로 업데이트
const ReplaceCounter = () => {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>What happens if you update state after replacing it</h1>
      <h2>{number}</h2>
      <button
        onClick={() => {
          setNumber(number + 5)
          setNumber((n) => n + 1)
        }}
      >
        Increase the number
      </button>
    </>
  )
}
// What happens if you replace state after updating it
// 상태를 업데이트 후 대체하게 된다면 최종적으로 대체한 결과로 반환됨
// 상태 큐(대기열) : number+5(replace), n=0, return=5 -> n=>n+1, n=5, return=5+1=6 -> 42(replace), n=6, return=42
const QueuedCounter = () => {
  const [number, setNumber] = useState(0)

  return (
    <>
      <h1>What happens if you replace state after updating it</h1>
      <h2>{number}</h2>
      <button
        onClick={() => {
          setNumber(number + 5)
          setNumber((n) => n + 1)
          setNumber(42)
        }}
      >
        Increase the number
      </button>
    </>
  )
}

// Naming conventions
const naming = (
  <>
    <h1>Naming conventions</h1>
    <p>해당 상태 변수의 첫 글자로 업데이트 함수 인수의 이름을 지정하는 것이 일반적</p>
    <code>
      setEnabled((e) => !e) <br />
      setLastName((ln) => ln.reverse()) <br />
      setFriendCount(fc => fc * 2)
    </code>
    <p>자세한 코드를 사용하고 싶다면 전체 상태 변수의 이름을 반복하거나 접두사를 사용</p>
    <code>
      setEnabled(enabled => !enabled)
      <br />
      setEnabled(prevEnabled => !prevEnabled)
    </code>
  </>
)

// Implement the state queue yourself
const Implement = () => {
  // 결과 값 계산
  const getFinalState = (baseState, queue) => {
    let finalState = baseState

    // baseState를 finalSate에 할당함
    // queue 배열을 순회하면서 각 update에 담아 처리함
    // update가 함수라면 함수를 호출하여 업데이트하고, 아니라면 update 값을 finalState에 할당함
    // 최종적으로 finalState에 담아 반환함
    for (let update of queue) {
      if (typeof update === 'function') {
        finalState = update(finalState)
      } else {
        finalState = update
      }
    }
    return finalState
  }

  // n => n+1를 함수로 간략화 함
  function increment(n) {
    return n + 1
  }
  increment.toString = () => 'n => n+1'

  // TestCase 컴포넌트 정의
  function TestCase({ baseState, queue, expected }) {
    const actual = getFinalState(baseState, queue)
    return (
      <>
        <p>
          Base State: <b>{baseState}</b>
        </p>
        <p>
          Queue: <b>[{queue.join(', ')}]</b>
        </p>
        <p style={{ color: actual === expected ? 'green' : 'red' }}>
          Your result: <b>{actual}</b> ({actual === expected ? 'correct' : 'wrong'})
        </p>
      </>
    )
  }
  return (
    <>
      <h1>Implement the state queue yourself</h1>
      <TestCase baseState={0} queue={[1, 1, 1]} expected={1} />
      <hr />
      <TestCase baseState={0} queue={[increment, increment, increment]} expected={3} />
      <hr />
      <TestCase baseState={0} queue={[5, increment]} expected={6} />
      <hr />
      <TestCase baseState={0} queue={[5, increment, 42]} expected={42} />
    </>
  )
}

const QueueingState = () => {
  return (
    <div>
      <Counter />
      <br />
      <ReplaceCounter />
      <br />
      <QueuedCounter />
      <br />
      {naming}
      <br />
      <Implement />
    </div>
  )
}

export default QueueingState
