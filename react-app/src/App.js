import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { useSelector } from 'react-redux';
import GetPosts from './components/posts/GetPosts'
import GetOthersPosts from './components/posts/GetOthersPosts';
<<<<<<< HEAD
import HomePage from './components/homePage';
=======
import PostDetail from './components/posts/PostDetail';
import CreatePostForm from './components/posts/CreatePost';
>>>>>>> dev

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);


  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user &&
        <NavBar />
      }

      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path='/session/posts' exact={true} >
          <GetPosts />
        </ProtectedRoute>
        
        <ProtectedRoute path='/posts/new' exact={true} >
          <CreatePostForm />
        </ProtectedRoute>

        <ProtectedRoute path='/posts/:postId' exact={true} >
          <PostDetail />
        </ProtectedRoute>



        <ProtectedRoute path='/users/:userId/posts' exact={true} >
          <GetOthersPosts />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <HomePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
