'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Skeleton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import FacebookButton from './FacebookLoginButton';
import { login, setUserDetails } from '../../api';

export default function LoginCard(props) {
  const { setUser } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const res = await login(email, password);
    if (res.error) {
      setIsLoading(false);
      return setErrors(res.error);
    }
    localStorage.setItem('token', res.token);
    await setUserDetails(setUser);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} w={'100%'} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            {errors.length > 0 ? (
              <Alert status="error" borderRadius={'md'}>
                <AlertIcon />
                {errors[0]}
              </Alert>
            ) : null}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={updateEmail}
                required={true}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={updatePassword}
                  required={true}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Skeleton isLoaded={!isLoading}>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={onSubmit}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Login
                </Button>
              </Stack>
            </Skeleton>
            <Stack pt={6}>
              <Text align={'center'}>
                Not a user?{' '}
                <Link color={'blue.400'} to="/facebook-clone/sign-up">
                  Sign up
                </Link>
              </Text>
            </Stack>
            <FacebookButton />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
