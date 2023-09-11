'use client';

import { Alert, AlertIcon, Flex } from '@chakra-ui/react';
import PostCard from './PostCard';
import { useEffect, useState } from 'react';
import { getUserPosts } from '../../api';

export default function PostContainer({ userId, setPostCount }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    handlePosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handlePosts = async () => {
    const res = await getUserPosts(userId);
    if (res.error) {
      setError(res.error.error);
      return;
    }
    setError(null);
    setPosts(res.posts);
    setPostCount(res.posts.length);
  };

  if (error) {
    return (
      <Alert status="error" borderRadius={'md'}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Flex gap={12} align={'flex-start'} justify={'center'} flexWrap={'wrap'}>
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </Flex>
  );
}
