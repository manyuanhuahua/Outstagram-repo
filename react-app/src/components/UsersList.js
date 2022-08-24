import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as userActions from '../store/session'

function UsersList() {
  // const [users, setUsers] = useState([]);
  const dispatch = useDispatch()
  const users = Object.values(useSelector(state => state.session.users))
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(users)

  const userComponents = users.map((user) => {
    return (
      <li style={{listStyle: 'none'}} key={user.id}>
        <NavLink to={`/users/${user.id}`}>
          <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start'}}>
              <img style={{height: '25px', width: '25px', borderRadius: '50%'}} src={user.profile_image} alt='profile' />
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '0 10px'}}>
              <span>{user.username}</span>
            </div>
          </div>
        </NavLink>
      </li>
    );
  });
  useEffect(() => {
    // async function fetchData() {
    //   const response = await fetch('/api/users/');
    //   const responseData = await response.json();
    //   setUsers(responseData.users);
    // }
    // fetchData();
    dispatch(userActions.getAllUsers()).then(() => setIsLoaded(true))
  }, [dispatch, users, userComponents]);

  return (
    <>
      {/* <h1>User List: </h1> */}
      <ul style={{padding: 0, display: 'flex', flexDirection: "column", alignItems: 'flex-start'}}>{setIsLoaded && userComponents.length > 0 && userComponents}</ul>
    </>
  );
}

export default UsersList;
