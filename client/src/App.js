import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavOutlet from './components/Navbar/Navbar';
import SignupCard from './components/Authentication/SignUp';
import LoginCard from './components/Authentication/Login';
import HomePage from './components/Home/HomePage';
import UserProfile from './components/Profile/UserProfile';
import NotFound from './components/Error/NotFound';
import FacebookToken from './components/Authentication/FacebookToken';
import { setUserDetails } from './api';

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
      <BrowserRouter>
        <Routes>
          {user.firstName ? (
            <>
              <Route
                path="/facebook-clone"
                element={<NavOutlet user={user} logout={logout} />}
              >
                <Route index element={<HomePage user={user} />} />
                <Route path="profile" element={<UserProfile user={user} />} />
                <Route
                  path="/facebook-clone/login"
                  element={<Navigate replace to="/facebook-clone" />}
                />
                <Route
                  path="/facebook-clone/sign-up"
                  element={<Navigate replace to="/facebook-clone" />}
                />
              </Route>
            </>
          ) : (
            <>
              <Route
                path="/facebook-clone/login"
                element={<LoginCard setUser={setUser} />}
              />
              <Route
                path="/facebook-clone/sign-up"
                element={<SignupCard setUser={setUser} />}
              />
              <Route
                path="/facebook-clone"
                element={<Navigate replace to="/facebook-clone/login" />}
              />
            </>
          )}
          <Route path="/" element={<Navigate replace to="/facebook-clone" />} />
          <Route
            path="/facebook-clone/token/:tokenId"
            element={<FacebookToken user={user} setUser={setUser} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
