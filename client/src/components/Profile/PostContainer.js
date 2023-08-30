'use client';

import { Flex } from '@chakra-ui/react';
import PostCard from './PostCard';

export default function PostContainer() {
  return (
    <Flex gap={12} align={'flex-start'} flexWrap={'wrap'}>
      <PostCard show={true} />
      <PostCard />
    </Flex>
  );
}
