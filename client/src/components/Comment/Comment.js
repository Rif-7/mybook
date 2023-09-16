import React, { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Spacer,
  Collapse,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../api';

export default function Comment({ comment, signedUser }) {
  const { _id, text, timestamp_formatted, userId, postId } = comment;
  const [showFullText, setShowFullText] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const toast = useToast();

  const handleCommentDelete = async () => {
    setIsDeleteLoading(true);
    const res = await deleteComment(postId, _id);
    setIsDeleteLoading(false);
    if (res.error) {
      toast({
        title: 'Error',
        description: res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsDeleted(true);
    toast({
      title: 'Success',
      description: res.success,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  if (isDeleted) {
    return null;
  }

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
          src={userId.profilePicUrl}
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
        {signedUser === userId._id && (
          <Button
            isLoading={isDeleteLoading}
            onClick={handleCommentDelete}
            size={'xs'}
            m={'none'}
            variant={'ghost'}
            colorScheme="red"
            ml={'3px'}
          >
            Delete
          </Button>
        )}
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
