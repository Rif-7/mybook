import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, Navigate, HashRouter } from 'react-router-dom';

import NavOutlet from './components/Navbar/Navbar';
import SignupCard from './components/Authentication/SignUp';
import LoginCard from './components/Authentication/Login';
import HomePage from './components/Home/HomePage';
import UserProfile from './components/Profile/UserProfile';
import NotFound from './components/Error/NotFound';
import FacebookToken from './components/Authentication/FacebookToken';
import { setUserDetails } from './api';
import UserList from './components/Users/UserList';
import UserPage from './components/UserPage/UserPage';

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUserDetails(setUser);
  }, []);
  const logout = () => {
    localStorage.removeItem('token');
    setUser({});
  };

  return (
    <ChakraProvider>
      <HashRouter basename="/mybook">
        <Routes>
          {user.firstName ? (
            <>
              <Route
                path="/mybook"
                element={<NavOutlet user={user} logout={logout} />}
              >
                <Route index element={<HomePage user={user} />} />
                <Route
                  path="profile"
                  element={<UserProfile user={user} setUser={setUser} />}
                />
                <Route path="users" element={<UserList />} />
                <Route
                  path="users/:userId"
                  element={<UserPage user={user} />}
                />

                <Route
                  path="/mybook/login"
                  element={<Navigate replace to="/mybook" />}
                />
                <Route
                  path="/mybook/sign-up"
                  element={<Navigate replace to="/mybook" />}
                />
              </Route>
            </>
          ) : (
            <>
              <Route
                path="/mybook/login"
                element={<LoginCard setUser={setUser} />}
              />
              <Route
                path="/mybook/sign-up"
                element={<SignupCard setUser={setUser} />}
              />
              <Route
                path="/mybook"
                element={<Navigate replace to="/mybook/login" />}
              />
            </>
          )}
          <Route path="/" element={<Navigate replace to="/mybook" />} />
          <Route
            path="/mybook/token/:tokenId"
            element={<FacebookToken user={user} setUser={setUser} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
