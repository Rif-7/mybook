'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
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
import { setUserDetails, signUp } from '../../api';

export default function SignupCard(props) {
  const { setUser } = props;

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateFirstname = e => setFirstname(e.target.value);
  const updateLastname = e => setLastname(e.target.value);
  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signUp(firstname, lastname, email, password);
    if (res.error) {
      setIsLoading(false);
      return setErrors(res.error);
    }
    localStorage.setItem('token', res.token);
    await setUserDetails(setUser);
  };

  return (
    <form onSubmit={onSubmit}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
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

              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={firstname}
                      onChange={updateFirstname}
                      required={true}
                      minLength={1}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lastname}
                      onChange={updateLastname}
                      required={true}
                      minLength={1}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  required={true}
                  minLength={1}
                  value={email}
                  onChange={updateEmail}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    required={true}
                    minLength={6}
                    value={password}
                    onChange={updatePassword}
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
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={onSubmit}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
              </Skeleton>

              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user?{' '}
                  <Link color={'blue.400'} to="/mybook/login">
                    Login
                  </Link>
                </Text>
              </Stack>
              <FacebookButton />
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
