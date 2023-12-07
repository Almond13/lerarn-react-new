import React, { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

// What’s a mutation?
const Mutation = () => {
  // 객체는 객체 내부의 속성을 직접 변경 할수 있으나 완전히 새로운 객체(setPosition)로 대체하는 것을 권장
  const [x, setX] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  useEffect(() => {
    setX(5)
    position.x = 5
  }, [position])

  function handlePositionY() {
    setPosition({
      ...position,
      y: 5
    })
  }

  return (
    <>
      <h1>What’s a mutation?</h1>
      <p>{x}</p>
      <p>X: {position.x}</p>
      <p>Y: {position.y}</p>
      <button onClick={handlePositionY}>Y 버튼</button>
    </>
  )
}

// Treat state as read-only
const MovingDot = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  return (
    <>
      <h1>Treat state as read-only</h1>
      <div
        onPointerMove={(e) => {
          // position.x = e.clientX 와 같은 코드를 사용하면 React는 변경을 인식하지 못하므로 상태 설정 기능을 사용해야 함
          const boundingBox = e.currentTarget.getBoundingClientRect()
          const offsetX = e.clientX - boundingBox.left
          const offsetY = e.clientY - boundingBox.top
          setPosition({
            x: offsetX,
            y: offsetY
          })

          // 방금 생성한 새로운 객체르 변경하는 것도 가능하다
          // const newPosition = {}
          //   newPosition.x = e.clientX - boundingBox.left
          //   newPosition.y = e.clientY -boundingBox.top
          //   setPosition(newPosition)
        }}
        style={{
          position: 'relative',
          width: '30vw',
          height: '30vh',
          border: '1px solid black',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: ' 50%',
            transform: `translate(${position.x}px, ${position.y}px)`,
            left: -10,
            top: -10,
            width: 20,
            height: 20
          }}
        />
      </div>
    </>
  )
}

// Copying objects with the spread syntax
const Form = () => {
  const [person, setPerson] = useState({
    firstName: 'Barbara',
    lastName: 'Hepworth',
    email: 'bhepworth@sculpture.com',
    country: 'Korea'
  })

  // object spread(...)을 사용하면 모든 속성을 복사하지 않아도 됨
  // object spread는 얕으며 한수준 깊이의 항목만 복사함
  function handleFirstNameChange(e) {
    // person.firstName = e.target.value
    setPerson({
      ...person, // 오래된 파일 복사
      firstName: e.target.value // 덮어 씀
    })
  }
  function handleLastNameChange(e) {
    // person.lastName = e.target.value
    setPerson({
      ...person, // 오래된 파일 복사
      lastName: e.target.value // 덮어 씀
    })
  }

  function handleEmailChange(e) {
    // person.email = e.target.value
    setPerson({
      ...person, // 오래된 파일 복사
      email: e.target.value // 덮어 씀
    })
  }

  // 세개의 이벤트 핸들러를 단일 이벤트 핸들러로 대체할 수 있음
  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <h1>Copying objects with the spread syntax</h1>
      <label>
        First name : <input value={person.firstName} onChange={handleFirstNameChange} />
      </label>
      <label>
        Last name : <input value={person.lastName} onChange={handleLastNameChange} />
      </label>
      <label>
        Email : <input value={person.email} onChange={handleEmailChange} />
      </label>
      <label>
        Country : <input name="country" value={person.country} onChange={handleChange} />
      </label>
      <p>
        {person.firstName} {person.lastName} ({person.email}) .{person.country}
      </p>
    </>
  )
}

// Updating a nested object
const NestedForm = () => {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg'
    }
  })

  function handleNameChange(e) {
    setPerson({
      ...person,
      name: e.target.value
    })
  }

  function handleTitleChange(e) {
    // React는 상태는 불변으로 으로 취급하므로 변경하려면 새 Artwork 객체를 생성한 다음 새 Person 객체를 생성해야 함
    // person.artwork.title = 'Nana'

    // const nextArtwork = { ...person.artwork, title: 'nana' }
    // const nextPerson = { ...person, artwork: nextArtwork }
    // setPerson(nextPerson)
    // 위의 함수를 아래 함수와 같이 단일 함수로 만들 수 있음
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        // title: 'Nana'
        title: e.target.value
      }
    })
  }

  function handleCityChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    })
  }

  function handleImageChange(e) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    })
  }

  return (
    <>
      <h1>Updating a nested object</h1>
      <label>
        Name: <input value={person.name} onChange={handleNameChange} />
      </label>
      <label>
        Title: <input value={person.artwork.title} onChange={handleTitleChange} />
      </label>
      <label>
        City: <input value={person.artwork.city} onChange={handleCityChange} />
      </label>
      <label>
        Image: <input value={person.artwork.image} onChange={handleImageChange} />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (location in {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </>
  )
}

const realNested = (
  <>
    <h3>객체는 실제로 중첩되지 않음</h3>
    <p>아래와 같은 객체는 코드에서 중첩된 것으로 나타남</p>
    <pre>
      <code>
        {`let obj = { 
          name: 'Niki de Saint Phalle',
          artwork: {
          title: 'Blue Nana',
          city: 'Hamburg',
          image: 'https://i.imgur.com/Sd1AgUOm.jpg',
          }
      }`}
      </code>
    </pre>
    <p>그러나 실제로 두가지 다른 객체를 보고있음</p>
    <pre>
      <code>
        {`let obj1 = {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
      }
      
      let obj2 = {
      name: 'Niki de Saint Phalle',
      artwork: obj1
      }`}
      </code>
    </pre>
  </>
)

// How does Immer work?
// Immer에서 제공하는 'draft'라는 일종의 가상 객체로 객체를 자유롭게 수정할 수 있음
// 기존 객체를 수정하는 것처럼 코드를 작성하지만 실제로는 변경 내용을 추적하고 새로운 객체를 생성하여 불변성을 유지하는 것과 같은 효과를 얻을 수 있음
const ImmerForm = () => {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg'
    }
  })

  function handleNameChange(e) {
    updatePerson((draft) => {
      draft.name = e.target.value
    })
  }
  function handleTitleChange(e) {
    updatePerson((draft) => {
      draft.artwork.title = e.target.value
    })
  }

  function handleCityChange(e) {
    updatePerson((draft) => {
      draft.artwork.city = e.target.value
    })
  }

  function handleImageChange(e) {
    updatePerson((draft) => {
      draft.artwork.image = e.target.value
    })
  }

  return (
    <div className="label-style">
      <h2>Deep : How does Immer work?</h2>
      <label>
        Name:
        <input value={person.name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Title:
        <input value={person.artwork.title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        City:
        <input value={person.artwork.city} onChange={handleCityChange} />
      </label>
      <br />
      <label>
        Image:
        <input value={person.artwork.image} onChange={handleImageChange} />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img src={person.artwork.image} alt={person.artwork.title} />
    </div>
  )
}

const UpdateObject = () => {
  return (
    <div>
      <style>
        {`
          .label-style label {
            display:'block'
          }
        `}
      </style>
      <Mutation />
      <MovingDot />
      <Form />
      <NestedForm />
      {realNested}
      <ImmerForm />
    </div>
  )
}
export default UpdateObject
