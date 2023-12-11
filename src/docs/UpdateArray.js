import React, { useState } from 'react'
import { useImmer } from 'use-immer'

//Updating arrays without mutation
const arrayMutation = (
  <>
    <h1>Updating arrays without mutation</h1>
    <p>React 상태 내에서 배열을 처리할 때 왼쪽 열의 메서드를 피하고 오른쪽 열의 메서드를 사용</p>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>avoid (mutates the array)</th>
          <th>prefer (returns a new array)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>adding</td>
          <td>
            <code>push, unshift</code>
          </td>
          <td>
            <code>concat, [...arr]</code> spread syntax
          </td>
        </tr>
        <tr>
          <td>removing</td>
          <td>
            <code>pop, shift, splice</code>
          </td>
          <td>
            <code>filter, slice</code>
          </td>
        </tr>
        <tr>
          <td>replacing</td>
          <td>
            <code>splice, arr[i] = ...</code> assignment
          </td>
          <td>
            <code>map</code>
          </td>
        </tr>
        <tr>
          <td>sorting</td>
          <td>
            <code>reverse, sort</code>
          </td>
          <td>copy the array first</td>
        </tr>
      </tbody>
    </table>
    <h3>slice 와 splice 의 차이</h3>
    <ul>
      <li>slice : 배열이나 그 일부 복사</li>
      <li>splice : 항목을 삽입 혹은 삭제하기 위해 배열을 변경</li>
    </ul>
  </>
)

// Adding to an array
let nextId = 0
const AddingList = () => {
  const [name, setName] = useState('')
  const [artists, setArtists] = useState([])

  return (
    <>
      <h1>Adding to an array</h1>
      <h3>Inspiring sculptors:</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {/*push 대신 ...array spread 구문을 사용 함*/}
      {/*<button*/}
      {/*    onClick={() => {*/}
      {/*        artists.push({*/}
      {/*            id: nextId++,*/}
      {/*            name: name*/}
      {/*        })*/}
      {/*    }}*/}
      {/*>*/}
      <button
        onClick={() => {
          // 배열의 시작 부분 부터 추가 됨
          // setArtists([{ id: nextId++, name: name }, ...artists])

          // 배열의 끝 부터 추가됨
          setArtists([...artists, { id: nextId++, name: name }])
        }}
      >
        Add
      </button>
      <ul>
        {artists.map((artists) => (
          <li key={artists.id}>{artists.name}</li>
        ))}
      </ul>
    </>
  )
}

// Removing from an array
let initialArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye' },
  { id: 2, name: 'Louise Nevelson' }
]

const RemovingList = () => {
  const [artists, setArtists] = useState(initialArtists)

  return (
    <>
      <h1>Removing from an array</h1>
      <h3>Inspiring sculptors:</h3>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button
              onClick={() => {
                // 해당 아티스트의 id와 다른 것들로 구성된 배열을 생성(필터)한다. 즉, 해당 아티스트를 배열에서 필터링한 다음 결과를 배열로 다시 랜더링 하도록 요청함
                setArtists(artists.filter((a) => a.id !== artist.id))
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

// Transforming an array
let initialShapes = [
  { id: 0, type: 'circle', x: 50, y: 100 },
  { id: 2, type: 'square', x: 150, y: 100 },
  { id: 3, type: 'circle', x: 250, y: 100 }
]
const ShapeEditor = () => {
  const [shapes, setShapes] = useState(initialShapes)
  function handleClick() {
    // const nextShapes = shapes.map((shape) => {
    //   if (shape.type === 'square') {
    //     // 타입이 square일 경우 변화 없음
    //     return shape
    //   } else {
    //     return {
    //       // new circle에 y + 50한 값이 반환됨
    //       ...shape,
    //       y: shape.y + 50
    //     }
    //   }
    // })
    // // 새로운 배열로 다시 랜더
    // setShapes(nextShapes)
    // 위의 함수를 아래 함수와 같이 단일 함수로 만들 수 있음
    setShapes(
      shapes.map((shape) => {
        if (shape.type === 'square') {
          return shape
        } else {
          return {
            ...shape,
            y: shape.y + 50
          }
        }
      })
    )
  }
  return (
    <>
      <h1>Transforming an array</h1>
      <button onClick={handleClick}>Move circle down!</button>
      <div
        style={{
          position: 'relative',
          width: '30vw',
          height: '30vh',
          border: '1px solid black',
          overflow: 'hidden'
        }}
      >
        {shapes.map((shape) => (
          <div
            key={shape.id}
            style={{
              background: 'purple',
              position: 'absolute',
              left: shape.x,
              top: shape.y,
              borderRadius: shape.type === 'circle' ? '50%' : '',
              width: 20,
              height: 20
            }}
          />
        ))}
      </div>
    </>
  )
}

// Replacing items in an array
let initialCounters = [0, 0, 0]
const CounterList = () => {
  const [counters, setCounters] = useState(initialCounters)

  function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      // map 호출 내에서 두번째 인수(i)로 항목의 인덱스를 받으며 이 인덱스를 사용하여 원본 항목을 반환하거나 다른 값을 반환할 수 있음
      // i(두번째 인수로 받은 인덱스)와 원본 항목의 인덱스가 일치하는 경우에만 기존 값에 +1이 됨
      if (i === index) {
        return c + 1
      } else {
        return c
      }
    })
    setCounters(nextCounters)
  }
  return (
    <>
      <h1>Replacing items in an array</h1>
      <ul>
        {counters.map((counter, i) => (
          <li key={i}>
            {counter}{' '}
            <button
              onClick={() => {
                handleIncrementClick(i)
              }}
            >
              + 1
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

// Inserting into an array
let afterId = 3
const insertArtists = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye' },
  { id: 2, name: 'Louise Nevelson' }
]
const InsertList = () => {
  const [name, setName] = useState('')
  const [artists, setArtists] = useState(insertArtists)

  function handleClick() {
    const insertAt = 1
    // array.slice[startIndex, endIndex] => startIndex를 포함해 startIndex부터 endIndex 전까지 잘라냄
    const nextArtists = [
      // 0부터 insertAt(1) 전까지 자르며 index가 0인 부분만 잘라낸다고 볼수있음
      ...artists.slice(0, insertAt),
      // 배열 사이에 새로운 item을 insert하며 id는 3에서부터 1씩 증가
      { id: afterId++, name: name },
      // 기존 index가 1 부터는 항상 새롭게 insert된 item뒤에 출력됨, 즉 새 item은 항상 index가 1이며 기존 index가 1인 item들은 뒤로 밀려난다.
      ...artists.slice(insertAt)
    ]
    setArtists(nextArtists)
    setName('')
    console.log(afterId, nextArtists)
  }

  return (
    <>
      <h1>Inserting into an array</h1>
      <h3>Inspiring sculptors:</h3>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleClick}>Insert</button>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </>
  )
}

// Making other changes to an array
// reverse나 sort같은 매서드는 원래 배열을 변경하므로 직접 사용할 수는 없으나 먼저 배열을 복사한 다음 변경할 수 있음
// 얕은 복사이기 때문에 배열을 복사하더라도 배열 내부의 기존 항목을 직접 변경할 수 없음
// list와 nextList는 결국 otherList라는 동일한 객체를 가르키고 있기 때문임
const otherList = [
  { id: 0, title: 'Big Bellies' },
  { id: 1, title: 'Lunar Landscape' },
  { id: 2, title: 'Terracotta Army' }
]
const OtherList = () => {
  const [list, setList] = useState(otherList)

  function handleClick() {
    const nextList = [...list]
    nextList.reverse()
    setList(nextList)
  }

  return (
    <>
      <h1>Making other changes to an array</h1>
      <button onClick={handleClick}>Reverse</button>
      <ul>
        {list.map((artwork) => (
          <li key={artwork.id}>{artwork.title}</li>
        ))}
      </ul>
    </>
  )
}

// Updating objects inside
// 얕은 복사를 사용하면 동일하게 initialList를 가르키기 때문에 새로운 객체를 만들고 그 객체에 변경내용을 담아야함
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true }
]
const BucketList = () => {
  const [myList, setMyList] = useState(initialList)
  const [yourList, setYourList] = useState(initialList)

  function handleToggleMyList(artworkId, nextSeen) {
    // myNextList로 새로운 배열을 만들고 새로운 배열의 'seen' 속성을 직접 변경함
    // const myNextList = [...myList]
    // myNextList의 배열의 각 요소룰 a에 담고 해당 요소의 id가 artworkId와 일치하는지 찾아 반환함
    // const artwork = myNextList.find((a) => a.id === artworkId)
    // artwork.seen = nextSeen
    // setMyList(myNextList)

    // map으로 새로운 배열(artwork)를 생성하고 기존 atwork의 속성들을 새로운 객체에 복사하고 seen속성만 변경한 새로운 객체를 반환
    // 방금 만든 개체만 변경해야 함
    setMyList(
      myList.map((artwork) => {
        if (artwork.id === artworkId) {
          return { ...artwork, seen: nextSeen }
        } else {
          return artwork
        }
      })
    )
  }

  function handleToggleYourList(artworkId, nextSeen) {
    const yourNextList = [...yourList]
    const artwork = yourNextList.find((a) => a.id === artworkId)
    artwork.seen = nextSeen
    setYourList(yourNextList)
  }

  // artworks는 List, onToggle은 handle함수와 대치된다.
  function ItemList({ artworks, onToggle }) {
    return (
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <label>
              <input
                type="checkbox"
                checked={artwork.seen}
                onChange={(e) => {
                  onToggle(artwork.id, e.target.checked)
                }}
              />
              {artwork.title}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <h1>Updating objects inside arrays</h1>
      <h2>Art Bucket List</h2>
      <h3>My list of art to see:</h3>
      <ItemList artworks={myList} onToggle={handleToggleMyList} />
      <h3>Your list of art to see:</h3>
      <ItemList artworks={yourList} onToggle={handleToggleYourList} />
    </>
  )
}

// Write concise update logic with Immer
// Immer는 편리한 변경 문법을 사용하면서 복사본을 생성하는 작업을 자동으로 처리함
const ImmerBucketList = () => {
  const [myList, updateMyList] = useImmer(initialList)
  const [yourList, updateYourList] = useImmer(initialList)

  function handleToggleMyList(id, nextSeen) {
    updateMyList((draft) => {
      const artwork = draft.find((a) => a.id === id)
      artwork.seen = nextSeen
    })
  }

  function handleToggleYourList(id, nextSeen) {
    updateYourList((draft) => {
      const artwork = draft.find((a) => a.id === id)
      artwork.seen = nextSeen
    })
  }

  function ItemList({ artworks, onToggle }) {
    return (
      <ul>
        {artworks.map((artwork) => (
          <li key={artwork.id}>
            <label>
              <input
                type="checkbox"
                checked={artwork.seen}
                onChange={(e) => {
                  onToggle(artwork.id, e.target.checked)
                }}
              />
              {artwork.title}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <h1>Write concise update logic with Immer</h1>
      <h2>Art Bucket List</h2>
      <h3>My list of art to see:</h3>
      <ItemList artworks={myList} onToggle={handleToggleMyList} />
      <h3>Your list of art to see:</h3>
      <ItemList artworks={yourList} onToggle={handleToggleYourList} />
    </>
  )
}

const UpdateArray = () => {
  return (
    <>
      <style>
        {`
          table {
            border-collapse : collapse
          }
        `}
        {`
          td, th {
            border : 1px solid #000;
            padding : 8px
          }
          `}
      </style>
      {arrayMutation}
      <AddingList />
      <RemovingList />
      <ShapeEditor />
      <CounterList />
      <InsertList />
      <OtherList />
      <BucketList />
      <ImmerBucketList />
    </>
  )
}

export default UpdateArray
