import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import NavOutlet from './components/Navbar/Navbar';
import SignupCard from './components/Authentication/SignUp';
import LoginCard from './components/Authentication/Login';
import HomePage from './components/Home/HomePage';
import UserProfile from './components/Profile/UserProfile';

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="facebook-clone" element={<NavOutlet />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="/" element={<Navigate replace to="facebook-clone/" />} />
          <Route path="/facebook-clone/sign-up" element={<SignupCard />} />
          <Route path="facebook-clone/login" element={<LoginCard />} />
          <Route path="*" element={<div>Error 404: Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
