import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as userActions from '../store/session'

function UsersList() {
  // const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  const users = Object.values(useSelector(state => state.session.users))

  useEffect(() => {
    // async function fetchData() {
    //   const response = await fetch('/api/users/');
    //   const responseData = await response.json();
    //   setUsers(responseData.users);
    // }
    // fetchData();
    dispatch(userActions.getAllUsers())
  }, [dispatch, users]);
  console.log(users)

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>
          <img style={{height: '15px', width: '15px', borderRadius: '50%'}} src={user.profile_image} alt='profile' />
          {user.username}
          <button>Follow</button>
        </NavLink>
      </li>
    );
  });

  return (
    <>
      {/* <h1>User List: </h1> */}
      <ul>{users && userComponents.length > 0 && userComponents}</ul>
    </>
  );
}

export default UsersList;
