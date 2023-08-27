'use client';

import {
  Heading,
  Avatar,
  Box,
  Center,
  Stack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

export default function UserCard(props) {
  const { firstName, lastName, profilePicUrl } = props.user;
  return (
    <Center py={6}>
      <Box
        w={'320px'}
        bg={useColorModeValue('white', 'gray.900')}
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
          //   bg="blackAlpha.700"
          //   color="white"
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
          >
            Sent Request
          </Button>
        </Stack>
      </Box>
    </Center>
  );
}
