'use client';

import { Button, Center, Text } from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';

export default function GuestLoginButton({ onClick, isLoading }) {
  return (
    <Center p={3}>
      <Button
        w={'full'}
        maxW={'md'}
        colorScheme={'blue'}
        isLoading={isLoading}
        onClick={onClick}
        leftIcon={<FaUser />}
      >
        <Center>
          <Text>Login as guest</Text>
        </Center>
      </Button>
    </Center>
  );
}
