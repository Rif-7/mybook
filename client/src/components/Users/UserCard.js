'use client';

import {
  Heading,
  Avatar,
  Box,
  Center,
  Stack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import { Link } from 'react-router-dom';
import { sentFriendRequest } from '../../api';

export default function UserCard(props) {
  const { firstName, lastName, profilePicUrl, _id } = props.user;
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const toast = useToast();

  const onFriendReqSent = async () => {
    setIsLoading(true);
    const res = await sentFriendRequest(_id);
    if (res.error) {
      toast({
        title: 'Error',
        description: res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }
    toast({
      title: 'Success',
      description: res.success,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setRequestSent(true);
  };

  if (requestSent) return null;

  return (
    <Center py={6}>
      <Box
        w={'320px'}
        bg={'white'}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}
      >
        <Avatar
          size={'2xl'}
          src={profilePicUrl}
          name={`${firstName} ${lastName}`}
          mb={4}
          pos={'relative'}
        />
        <Heading
          fontSize={'2xl'}
          fontFamily={'body'}
          _hover={{
            textDecoration: 'underline',
          }}
        >
          <Link to="#">{`${firstName} ${lastName}`}</Link>
        </Heading>

        <Stack mt={8} direction={'row'} spacing={4}>
          <Button
            flex={1}
            fontSize={'sm'}
            rounded={'full'}
            bg={'blue.400'}
            color={'white'}
            boxShadow={
              '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
            }
            _hover={{
              bg: 'blue.500',
            }}
            _focus={{
              bg: 'blue.500',
            }}
            isLoading={isLoading}
            onClick={onFriendReqSent}
          >
            Sent Request
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
