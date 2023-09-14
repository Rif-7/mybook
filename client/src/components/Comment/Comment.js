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

export default function Comment({ comment }) {
  const { text, timestamp, userId } = comment;
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
          size="sm"
        />
        <Text
          ml="5px"
          fontWeight="bold"
        >{`${userId.firstName} ${userId.lastName}`}</Text>
        <Spacer />
        <Text fontSize="sm" color="gray.600">
          {timestamp}
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
