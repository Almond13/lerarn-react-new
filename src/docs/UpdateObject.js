import React, { useEffect } from 'react'
import { useState } from 'react'

const Mutation = () => {
  // 객체는 객체 내부의 속성을 직접 변경 할수 있으나 완전히 새로운 객체(setPosition)로 대체하는 것을 권장
  const [x, setX] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    setX(5)
    position.x = 5
  }, [])
  return (
    <>
      <p>{x}</p>
      <p>X: {position.x}</p>
    </>
  )
}
const UpdateObject = () => {
  return (
    <div>
      <Mutation />
    </div>
  )
}
export default UpdateObject
