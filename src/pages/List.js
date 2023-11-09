import React from 'react';

const User = ({userData}) => {
    return (
        <tr>
            <td>{userData.name}</td>
            <td>{userData.email}</td>
        </tr>
    );
};

const UserList = () => {
    const users = [
        {email: 'user1@gmail.com', name: '김일식'},
        {email: 'user2@gmail.com', name: '김두식'},
        {email: 'user3@gmail.com', name: '김삼식'},
        {email: 'user5@gmail.com', name: '김오식'},
    ];
    return (
        <table>
            <thead>
                <tr>
                    <th>이름</th>
                    <th>이메일</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => <User userData={user} />)}
            </tbody>
        </table>
    );
};

export default UserList;
