'use client';

import { FaFacebook } from 'react-icons/fa';
import { Button, Center, Text } from '@chakra-ui/react';
import { apiUrl } from '../../api';
import { Link } from 'react-router-dom';

export default function FacebookButton() {
  return (
    <Link to={apiUrl + "/auth/fb"}>
      <Center p={3}>
        <Button
          w={'full'}
          maxW={'md'}
          colorScheme={'facebook'}
          leftIcon={<FaFacebook />}
        >
          <Center>
            <Text>Continue with Facebook</Text>
          </Center>
        </Button>
      </Center>
    </Link>
  );
}
