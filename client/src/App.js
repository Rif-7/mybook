import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavOutlet from './components/Navbar/Navbar';
import SignupCard from './components/Authentication/SignUp';
import LoginCard from './components/Authentication/Login';
import HomePage from './components/Home/HomePage';
import UserProfile from './components/Profile/UserProfile';
import NotFound from './components/Error/NotFound';
import FacebookToken from './components/Authentication/FacebookToken';

function App() {
  const [user, setUser] = useState({});

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/facebook-clone" element={<NavOutlet />}>
            <Route index element={<HomePage user={user} />} />
            <Route path="profile" element={<UserProfile user={user} />} />
          </Route>

          <Route path="/facebook-clone/login" element={<LoginCard />} />
          <Route path="/facebook-clone/sign-up" element={<SignupCard />} />

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
