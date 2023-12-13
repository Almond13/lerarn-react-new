import React from 'react'

// Passing props to a component
const Profile = () => {
  // size가 전달되지 않을때는 기본값으로 s를 사용하므로 getImageUrl를 호출할때 굳이 전달하지 않음
  function getImageUrl(person, size = 's') {
    return 'https://i.imgur.com/' + person.imageId + size + '.jpg'
  }

  // props로 받아 아래와 같이 '구조 분해'하는 형태도 있음
  // function Avatar(props) {
  //    let person = props.person
  //    let size = props.size
  // 만약 Avatar 컴포넌트에 size가 지정되지 않았거나 기본값을 사용하고 싶다면 아래와 같이 사용하면 기본값으로 지정 됨
  // function Avatar({ person, size = 100 }) {
  function Avatar({ person, size }) {
    return (
      <img
        className="avatar"
        src={getImageUrl(person)}
        alt={person.name}
        width={size}
        height={size}
      />
    )
  }

  return (
    <div>
      <h1>Passing props to a component</h1>
      <Avatar
        size={100}
        person={{
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2'
        }}
      />
      <Avatar
        size={80}
        person={{
          name: 'Aklilu Lemma',
          imageId: 'OKS67lh'
        }}
      />
      <Avatar
        size={50}
        person={{
          name: 'Lin Lanying',
          imageId: '1bX5QH6'
        }}
      />
    </div>
  )
}
export default function PassingComponent() {
  return <Profile />
}
