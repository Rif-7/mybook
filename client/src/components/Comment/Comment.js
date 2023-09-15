import React, { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Spacer,
  Collapse,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Comment({ comment }) {
  const { text, timestamp_formatted, userId } = comment;
  const [showFullText, setShowFullText] = useState(false);

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      mt={'4px'}
      p={4}
      boxShadow="md"
      bgColor="white"
      width="100%"
    >
      <Flex align="center" mb={'2'}>
        <Avatar
          src={userId.profilePictureUrl}
          name={`${userId.firstName} ${userId.lastName}`}
          size={{ base: 'xs', md: 'sm' }}
        />
        <Text
          ml="5px"
          fontWeight="semibold"
          fontSize={{ base: 'xs', md: 'md' }}
        >
          <Link
            to={`/facebook-clone/users/${userId._id}`}
          >{`${userId.firstName} ${userId.lastName}`}</Link>
        </Text>
        <Spacer />
        <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.600">
          {timestamp_formatted}
        </Text>
      </Flex>

      <Collapse startingHeight={25} in={showFullText}>
        {text}
      </Collapse>
      <Button
        variant={'link'}
        color={'gray'}
        size={'xs'}
        mt={'2px'}
        onClick={() => setShowFullText(!showFullText)}
      >
        See {showFullText ? 'less' : 'more'}
      </Button>
    </Box>
  );
}
